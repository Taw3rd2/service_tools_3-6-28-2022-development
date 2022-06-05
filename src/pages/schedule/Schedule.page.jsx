import React, { lazy, Suspense, useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import Calendar from "./calendar/Calendar.view";
import Spinner from "../../components/spinner/Spinner";

import { Box, Tab, Tabs } from "@mui/material";

const AddDayLabelModal = lazy(() => import("./modals/AddDayLabel.modal"));
const DailyOptionsMenuModal = lazy(() =>
  import("./modals/DailyOptionsMenu.modal")
);
const DayLabelEditorModal = lazy(() => import("./modals/DayLabelEditor.modal"));
const DeleteDayLabelModal = lazy(() => import("./modals/DeleteDayLabel.modal"));
const DeleteDispatchModal = lazy(() => import("./modals/DeleteDispatch.modal"));
const DispatchEditorModal = lazy(() => import("./modals/DispatchEditor.modal"));
const EditDayLabelModal = lazy(() => import("./modals/EditDayLabel.modal"));
const JobCompletedModal = lazy(() => import("./modals/JobComplete.modal"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`calendar-tabpanel-${index}`}
      aria-labelledby={`calendar-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `calendar-tab-${index}`,
    "aria-controls": `calendar-tabpanel-${index}`,
  };
}

const Schedule = () => {
  const db = getFirestore();

  //Fetch Technicians
  const [technicians, setTechnicians] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  //Tabs
  const [tabValue, setTabValue] = useState(0);
  const handleChangeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  //Dispatch Editor
  const [isDispatchEditorModalOpen, setDispatchEditorModalOpen] =
    useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState({});
  const openDispatchEditorModal = (info) => {
    setSelectedDispatch(info);
    setDispatchEditorModalOpen(true);
  };
  const closeDispatchEditorModal = () => {
    setDispatchEditorModalOpen(false);
  };

  //Job Completed
  const [isJobCompletedModalOpen, setJobCompletedModalOpen] = useState(false);
  const openJobCompletedModal = () => {
    setJobCompletedModalOpen(true);
  };
  const closeJobCompletedModal = () => {
    setJobCompletedModalOpen(false);
  };

  //Daily Options
  const [isDailyOptionsMenuOpen, setDailyOptionsMenuOpen] = useState(false);
  const [calendarDateSelected, setCalendarDateSelected] = useState({});
  const openDailyOptionsMenu = (date) => {
    setCalendarDateSelected(date);
    setDailyOptionsMenuOpen(true);
  };
  const closeDailyOptionsMenu = () => {
    setCalendarDateSelected({});
    setDailyOptionsMenuOpen(false);
  };

  //Day Label Editor
  const [isDayLabelEditorModalOpen, setDayLabelEditorModalOpen] =
    useState(false);
  const [selectedDayLabel, setSelectedDayLabel] = useState({});
  const openDayLabelEditor = () => {
    setDayLabelEditorModalOpen(true);
  };
  const closeDayLabelEditor = () => {
    setDayLabelEditorModalOpen(false);
  };

  //Add Day Label Modal
  const [isAddDayLabelModalOpen, setAddDayLabelModalOpen] = useState(false);
  const openAddDayLabelModal = () => {
    setAddDayLabelModalOpen(true);
  };
  const closeAddDayLabelModal = () => {
    setAddDayLabelModalOpen(false);
  };

  //Delete Day Label Modal
  const [isDeleteDayLabelModalOpen, setDeleteDayLabelModalOpen] =
    useState(false);
  const openDeleteDayLabelModal = (label) => {
    console.log("dayLabel: ", label);
    setSelectedDayLabel(label);
    setDeleteDayLabelModalOpen(true);
  };
  const closeDeleteDayLabelModal = () => {
    setDeleteDayLabelModalOpen(false);
  };

  //Edit Day Label Modal
  const [isEditDayLabelModalOpen, setEditDayLabelOpen] = useState(false);
  const openEditDayLabelModal = (label) => {
    setSelectedDayLabel(label);
    setEditDayLabelOpen(true);
  };
  const closeEditDayLabelModal = () => {
    setEditDayLabelOpen(false);
  };

  //Delete Dispatch Modal
  const [isDeleteDispatchModalOpen, setDeleteDispatchModalOpen] =
    useState(false);
  const openDeleteDispatchModal = () => {
    setDeleteDispatchModalOpen(true);
  };
  const closeDeleteDispatchModal = () => {
    setDeleteDispatchModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="calendar tabs"
        >
          <Tab label="ALL" {...a11yProps(0)} />
          {technicians.length > 0 &&
            technicians.map((technician, index) => (
              <Tab
                key={technician.id}
                label={technician.name}
                style={{
                  backgroundColor: `${technician.color}`,
                  color: "white",
                }}
                {...a11yProps(index + 1)}
              />
            ))}
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Calendar
          technician={"ALL"}
          technicians={technicians}
          openDispatchEditorModal={openDispatchEditorModal}
          openDailyOptionsMenu={openDailyOptionsMenu}
        />
      </TabPanel>
      {technicians.length > 0 &&
        technicians.map((technician, index) => (
          <TabPanel key={technician.id} value={tabValue} index={index + 1}>
            <Calendar
              technician={technician.name}
              technicians={technicians}
              openDispatchEditorModal={openDispatchEditorModal}
              openDailyOptionsMenu={openDailyOptionsMenu}
            />
          </TabPanel>
        ))}
      {isDispatchEditorModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DispatchEditorModal
            isDispatchEditorModalOpen={isDispatchEditorModalOpen}
            closeDispatchEditorModal={closeDispatchEditorModal}
            selectedDispatch={selectedDispatch}
            openJobCompletedModal={openJobCompletedModal}
            openDeleteDispatchModal={openDeleteDispatchModal}
          />
        </Suspense>
      )}
      {isJobCompletedModalOpen && (
        <Suspense fallback={<Spinner />}>
          <JobCompletedModal
            isJobCompletedModalOpen={isJobCompletedModalOpen}
            closeJobCompletedModal={closeJobCompletedModal}
          />
        </Suspense>
      )}
      {isDailyOptionsMenuOpen && (
        <Suspense fallback={<Spinner />}>
          <DailyOptionsMenuModal
            isDailyOptionsMenuOpen={isDailyOptionsMenuOpen}
            closeDailyOptionsMenu={closeDailyOptionsMenu}
            calendarDateSelected={calendarDateSelected}
            openDayLabelEditor={openDayLabelEditor}
          />
        </Suspense>
      )}
      {isDayLabelEditorModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DayLabelEditorModal
            isDayLabelEditorModalOpen={isDayLabelEditorModalOpen}
            closeDayLabelEditor={closeDayLabelEditor}
            openAddDayLabelModal={openAddDayLabelModal}
            openDeleteDayLabelModal={openDeleteDayLabelModal}
            openEditDayLabelModal={openEditDayLabelModal}
            calendarDateSelected={calendarDateSelected}
          />
        </Suspense>
      )}
      {isAddDayLabelModalOpen && (
        <Suspense fallback={<Spinner />}>
          <AddDayLabelModal
            isAddDayLabelModalOpen={isAddDayLabelModalOpen}
            closeAddDayLabelModal={closeAddDayLabelModal}
            calendarDateSelected={calendarDateSelected}
          />
        </Suspense>
      )}
      {isDeleteDayLabelModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteDayLabelModal
            isDeleteDayLabelModalOpen={isDeleteDayLabelModalOpen}
            closeDeleteDayLabelModal={closeDeleteDayLabelModal}
            calendarDateSelected={calendarDateSelected}
            selectedDayLabel={selectedDayLabel}
          />
        </Suspense>
      )}
      {isEditDayLabelModalOpen && (
        <Suspense fallback={<Spinner />}>
          <EditDayLabelModal
            isEditDayLabelModalOpen={isEditDayLabelModalOpen}
            closeEditDayLabelModal={closeEditDayLabelModal}
            calendarDateSelected={calendarDateSelected}
            selectedDayLabel={selectedDayLabel}
          />
        </Suspense>
      )}
      {isDeleteDispatchModalOpen && (
        <Suspense fallback={<Spinner />}>
          <DeleteDispatchModal
            isDeleteDispatchModalOpen={isDeleteDispatchModalOpen}
            closeDeleteDispatchModal={closeDeleteDispatchModal}
            closeDispatchEditorModal={closeDispatchEditorModal}
            selectedDispatch={selectedDispatch}
          />
        </Suspense>
      )}
    </Box>
  );
};

export default Schedule;
