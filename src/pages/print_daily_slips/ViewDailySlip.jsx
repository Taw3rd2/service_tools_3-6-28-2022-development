import React from "react";

import { getFormattedDate } from "../../utilities/dateUtils";

import { Grid, Paper, TextField, Typography } from "@mui/material";

const ViewDailySlip = (props) => {
  return (
    <Grid item xs sx={{ marginTop: "24px", marginLeft: "24px" }}>
      <Paper variant="outlined" sx={{ height: 410, width: 550 }}>
        <Grid container>
          <Grid item xs={4} sx={{ paddingLeft: "8px" }}>
            {/* Service Date */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Service Date"
              value={getFormattedDate(props.children[1].dateScheduled)}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/* Lead Source */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Lead Source"
              value={props.children[1].leadSource}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ paddingRight: "8px" }}>
            {/* Call Taken By */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Dispatcher"
              value={props.children[1].takenBy}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          {props.children[1].firstname ? (
            <>
              <Grid item xs={6} sx={{ paddingLeft: "8px" }}>
                <Typography noWrap variant="body1">
                  {props.children[1].firstname} {props.children[1].lastname}
                </Typography>
              </Grid>

              <Grid item xs={6} sx={{ paddingRight: "8px" }}>
                {props.children[1].phoneName && props.children[1].phone ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phoneName}: ${props.children[1].phone}`}
                  </Typography>
                ) : props.children[1].phoneName ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phoneName}`}
                  </Typography>
                ) : props.children[1].phone ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phone}`}
                  </Typography>
                ) : null}
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={6} sx={{ paddingLeft: "8px" }}>
                <Typography noWrap variant="body1">
                  {props.children[1].lastname}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ paddingRight: "8px" }}>
                {props.children[1].phoneName && props.children[1].phone ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phoneName}: ${props.children[1].phone}`}
                  </Typography>
                ) : props.children[1].phoneName ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phoneName}`}
                  </Typography>
                ) : props.children[1].phone ? (
                  <Typography noWrap variant="body1">
                    {`${props.children[1].phone}`}
                  </Typography>
                ) : null}
              </Grid>
            </>
          )}
          <Grid item xs={6} sx={{ paddingLeft: "8px" }}>
            <Typography noWrap variant="body1">
              {props.children[1].street}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ paddingRight: "8px" }}>
            {props.children[1].altPhoneName && props.children[1].altphone ? (
              <Typography noWrap variant="body1">
                {`${props.children[1].altPhoneName}: ${props.children[1].altphone}`}
              </Typography>
            ) : props.children[1].altPhoneName ? (
              <Typography noWrap variant="body1">
                {`${props.children[1].altPhoneName}`}
              </Typography>
            ) : props.children[1].altphone ? (
              <Typography noWrap variant="body1">
                {`${props.children[1].altphone}`}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: "8px" }}>
            <Typography noWrap variant="body1">
              {props.children[1].city}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ paddingRight: "8px" }} />
          <Grid item xs={6} sx={{ paddingLeft: "8px", paddingRight: "4px" }}>
            {/*Work Selector*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Issue"
              value={props.children[1].issue}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sx={{ paddingLeft: "4px", paddingRight: "8px" }}>
            {/*Slotted Time*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Slotted Time"
              value={props.children[1].timeAlotted}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ paddingLeft: "8px" }}>
            {/*Tech Lead*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Tech Lead"
              value={props.children[1].techLead}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/*Tech helper*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Tech Helper"
              value={props.children[1].techHelper}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} sx={{ paddingRight: "8px" }}>
            {/*Payment*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Payment"
              value={props.children[1].payment}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/* Notes */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Notes (4 lines max for printable view)"
              rows="4"
              fullWidth
              multiline
              value={props.children[1].notes}
            />
          </Grid>

          <Grid item xs={4} sx={{ paddingLeft: "8px" }}>
            {/*Time Of Day*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Requested"
              value={props.children[1].timeOfDay}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ paddingLeft: "8px", paddingRight: "8px" }}
          ></Grid>
          <Grid item xs={4} sx={{ paddingRight: "8px" }}>
            {/*Job Number*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Job Number"
              value={props.children[1].jobNumber}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ViewDailySlip;
