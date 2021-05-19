import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Tooltip,
  Button,
  Typography,
  TextField,
  InputAdornment,
  LinearProgress,
  IconButton,
  Fade,
} from "@material-ui/core";
import { Add, Flight, InfoOutlined, Remove } from "@material-ui/icons";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

import classNames from "classnames";
import moment from "moment";

import {
  updateFlight,
  removeFlight,
  createFlight,
} from "../Redux/Entities/Flights/actions";

import "./flights.css";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
    title: {
      color: "#445e8e",
    },
    total: {
      paddingRight: "16px",
      color: "#445e8eb3",
    },
    totalRow: {
      paddingBottom: "32px",
    },
    flightRow: {
      padding: "none",
    },
    flightPicker: {
      padding: "12px 12px 17px 12px !important",
    },
  })
);

function FlightsCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flightReducer);

  const handleInputChange = (event, flightIndex, property) => {
    dispatch(updateFlight(event.target.value, flightIndex, property));
  };

  const handleDateChange = (date, flightIndex, property) => {
    dispatch(updateFlight(date, flightIndex, property));
  };

  const handleRemoveFlight = (index) => {
    /* CODING CHALLENGE: Dispatch removeFlight action */
  };

  const handleCreateFlight = () => {
    dispatch(
      createFlight({
        budget: 0,
        campaignFlightId: Math.random(),
        campaignId: null,
        endDate: null,
        modifiedBy: null,
        modifiedDate: null,
        notes: null,
        preBidShadingSavings: 0,
        preBidShadingSpent: 0,
        spent: 0,
        startDate: moment(),
      })
    );
  };

  const handleGetTotal = (property) => {
    return flights.reduce((total, flight) => {
      return !!flight[property] ? total + flight[property] : total + 0;
    }, 0);
  };

  return (
    <Paper
      elevation={3}
      className={classNames({ "bt-card-1": true, [classes.root]: true })}
    >
      <Grid container direction="column">
        <Grid item>
          <div className="bt-toolbar">
            <Grid container direction="row" className="md-toolbar-tools">
              <Grid item xs>
                <Typography variant="h5" color="primary">
                  Campaign Flights
                </Typography>
              </Grid>
              <Grid item>
                <Tooltip
                  placement="left"
                  title="Select start and end dates for your campaign flights. Your campaign will run only on these scheduled periods of time and will use the budget allocated for each period."
                >
                  <InfoOutlined />
                </Tooltip>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid container direction="row" item>
          <Grid item xs>
            <span className="bt-padding">
              Create flights and allocate specific budgets for 1 or more
              scheduled periods of time.
            </span>
          </Grid>
          <Grid item>
            <Tooltip title="">
              <Button color="primary" onClick={handleCreateFlight}>
                <Add />
                CREATE A FLIGHT
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        {flights.map((flight, index) => (
          <Fade
            in
            mountOnEnter
            unmountOnExit
            timeout={250}
            key={flight.campaignFlightId}
          >
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              spacing={3}
              className={classNames({
                "bt-padding": true,
                "bt-flight-1-row": flights.length <= 1,
                "bt-flight-many-rows": flights.length > 1,
                [classes.flightRow]: true,
              })}
            >
              <Grid item>
                <Flight color="primary"></Flight>
              </Grid>
              <Grid item xs className={classes.flightPicker}>
                <KeyboardDatePicker
                  required
                  // Challenge 2: Add "day" argument to override Moment's default check for milliseconds,
                  // and utilize component's "disablePast" property to disallow selecting dates before today
                  disabled={moment(flight.startDate).isBefore(moment(), "day")}
                  disablePast={moment(flight.startDate).isSameOrAfter(moment(), "day")}
                  name={"startDate_" + index}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Flight Start"
                  value={flight.startDate}
                  onChange={(date) =>
                    handleDateChange(date, index, "startDate")
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs className={classes.flightPicker}>
                <KeyboardDatePicker
                  required
                  disabled={moment(flight.endDate).isBefore(moment())}
                  name={"endDate_" + index}
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  label="Flight End"
                  value={flight.endDate}
                  onChange={(date) => handleDateChange(date, index, "endDate")}
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <TextField
                  required
                  label="Flight Budget"
                  name={"budget_" + index}
                  InputProps={{
                    startAdornment: (
                      // Challenge 1: Missing "flight.budget" property in input
                      <InputAdornment position="start">${flight.budget}</InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid container direction="column" item xs>
                <Grid item>
                  <span>${!!flight.spent ? flight.spent : 0} spent</span>
                </Grid>
                <Grid item>
                  <LinearProgress
                    variant="determinate"
                    value={
                      ((flight.spent ? flight.spent : 0) * 100) /
                      (flight.budget ? flight.budget : 1)
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs>
                <TextField
                  label="Notes"
                  name={"flights_" + index}
                  value={flight.flights}
                  onChange={(e) => handleInputChange(e, index, "notes")}
                  fullWidth
                />
              </Grid>
              {flights.length > 1 && (
                <Grid item>
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveFlight(index)}
                  >
                    <Remove></Remove>
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </Fade>
        ))}
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={3}
          className={classNames({
            "bt-padding": true,
            [classes.totalRow]: true,
          })}
        >
          <Grid item style={{ width: "52px" }}></Grid>
          <Grid item xs />
          <Grid item xs />
          <Grid item xs container direction="row">
            <span className={classes.total}>TOTAL</span>
            <span>${handleGetTotal("budget").toLocaleString()}</span>
          </Grid>
          <Grid container direction="column" item xs>
            <Grid item>
              <span>${handleGetTotal("spent")} spent</span>
            </Grid>
            <Grid item>
              <LinearProgress
                variant="determinate"
                value={
                  (handleGetTotal("spent") * 100) / handleGetTotal("budget")
                }
              />
            </Grid>
          </Grid>
          <Grid item xs></Grid>
          {
            //To match styling of flight rows
            flights.length > 1 && <Grid item style={{ width: "48px" }}></Grid>
          }
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FlightsCard;
