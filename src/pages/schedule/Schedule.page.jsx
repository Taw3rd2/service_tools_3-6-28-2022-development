import React, { lazy, Suspense, useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import Calendar from "./calendar/Calendar.view";
import Spinner from "../../components/spinner/Spinner";

import { Box, Tab, Tabs } from "@mui/material";

const DispatchEditorModal = lazy(() => import("./modals/DispatchEditor.modal"));
const JobCompletedModal = lazy(() => import("./modals/JobComplete.modal"));
const DailyOptionsMenuModal = lazy(() =>
  import("./modals/DailyOptionsMenu.modal")
);
const DayLabelEditorModal = lazy(() => import("./modals/DayLabelEditor.modal"));

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
  const openDayLabelEditor = () => {
    setDayLabelEditorModalOpen(true);
  };
  const closeDayLabelEditor = () => {
    setDayLabelEditorModalOpen(false);
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
            calendarDateSelected={calendarDateSelected}
          />
        </Suspense>
      )}
    </Box>
  );
};

export default Schedule;
