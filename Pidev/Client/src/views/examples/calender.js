import * as React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
    EditingState,
    ViewState,
} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    DayView,
    MonthView,
    Appointments,
    Toolbar,
    DateNavigator,
    ViewSwitcher,
    AppointmentForm,
    AppointmentTooltip,
    TodayButton, DragDropProvider, EditRecurrenceMenu, AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';

import {connectProps} from "@devexpress/dx-react-core";
import {Component} from "react";

const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';



const makeQueryString = (currentDate, currentViewName) => {
    const format = 'YYYY-MM-DDTHH:mm:ss';
    const start = moment(currentDate).startOf(currentViewName.toLowerCase());
    const end = start.clone().endOf(currentViewName.toLowerCase());
    return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};


const styles = theme => ({
    toolbarRoot: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
    },
});

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
    ({ children, classes, ...restProps }) => (
        <div className={classes.toolbarRoot}>
            <Toolbar.Root {...restProps}>
                {children}
            </Toolbar.Root>
            <LinearProgress className={classes.progress} />
        </div>
    ),
);

const mapAppointmentData = appointment => ({
    ...appointment,
    _id:appointment._id,
    nom: appointment.nom,
    datedebut: appointment.datedebut,
    datefin: appointment.datefin,
    nbplace: appointment.nbplace
});





class Calender extends  React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data:[],
            loading: true,
            currentDate: new Date(),
            currentViewName: 'Day',
            confirmationVisible: false,
            editingFormVisible: false,
            deletedAppointmentId: undefined,
            editingAppointment: undefined,
            previousAppointment: undefined,
            addedAppointment: {},
            startDayHour: 0,
            endDayHour: 24,
            isNewAppointment: false,
        };


        this.loadData = this.loadData.bind(this);
        this.currentViewNameChange = (currentViewName) => {
            this.setState({currentViewName, loading: true});
        };
        this.currentDateChange = (currentDate) => {
            this.setState({currentDate, loading: true});
        };

        this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
        this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
        this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(this);

        this.commitChanges = this.commitChanges.bind(this);
        this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(this);
        this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
        this.appointmentForm = connectProps(null, () => {
            const {
                editingFormVisible,
                editingAppointment,
                data,
                addedAppointment,
                isNewAppointment,
                previousAppointment,
            } = this.state;

            const currentAppointment = data
                    .filter(appointment => editingAppointment && appointment._id === editingAppointment._id)[0]
                || addedAppointment;
            const cancelAppointment = () => {
                if (isNewAppointment) {
                    this.setState({
                        editingAppointment: previousAppointment,
                        isNewAppointment: false,
                    });
                }
            };

            return {
                visible: editingFormVisible,
                appointmentData: currentAppointment,
                commitChanges: this.commitChanges,
                visibleChange: this.toggleEditingFormVisibility,
                onEditingAppointmentChange: this.onEditingAppointmentChange,
                cancelAppointment,
            };
        });

    }


    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
        this.appointmentForm.update();
    }

    loadData() {
        const { currentDate, currentViewName } = this.state;
        const queryString = makeQueryString(currentDate, currentViewName);
        if (queryString === this.lastQuery) {
            this.setState({ loading: false });
            return;
        }
        axios.get('http://localhost:9000/events/all')
            .then(response => response.data)
            .then(data=>setTimeout(() => {
                this.setState({
                    data:data,
                    loading:false
                })}, 600)
            )
            .catch(() => this.setState({ loading: false }));
        this.lastQuery = queryString;
    }
    onEditingAppointmentChange(editingAppointment) {
        this.setState({ editingAppointment });
    }

    onAddedAppointmentChange(addedAppointment) {
        this.setState({ addedAppointment });
        const { editingAppointment } = this.state;
        if (editingAppointment !== undefined) {
            this.setState({
                previousAppointment: editingAppointment,
            });
        }
        this.setState({ editingAppointment: undefined, isNewAppointment: true });
    }

    setDeletedAppointmentId(id) {
        this.setState({ deletedAppointmentId: id });
    }

    toggleEditingFormVisibility() {
        const { editingFormVisible } = this.state;
        this.setState({
            editingFormVisible: !editingFormVisible,
        });
    }

    toggleConfirmationVisible() {
        const { confirmationVisible } = this.state;
        this.setState({ confirmationVisible: !confirmationVisible });
    }

    commitDeletedAppointment() {
        this.setState((state) => {
            const { data, deletedAppointmentId } = state;
            const nextData = data.filter(appointment => appointment._id !== deletedAppointmentId);

            console.log(deletedAppointmentId);
            return { data: nextData, deletedAppointmentId: null };
        });
        this.toggleConfirmationVisible();
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1]._id + 1 : 0;
                data = [...data, { _id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment._id] ? { ...appointment, ...changed[appointment._id] } : appointment));
            }
            if (deleted !== undefined) {
                this.setDeletedAppointmentId(deleted);
                this.toggleConfirmationVisible();
            }
            return { data, addedAppointment: {} };
        });
    }



    render() {
        const {
            data, loading,
            currentDate, currentViewName,
            editingFormVisible
        } = this.state;
        const { classes } = this.props;

        const formattedData = data
            ? data.map(mapAppointmentData) : [];
        console.log(formattedData);

        //console.log(formattedData[0]._id);

        return (
            <Paper>
                <Scheduler
                    data={formattedData}
                    height={660}
                >
                    <ViewState
                        currentDate={currentDate}
                        currentViewName={currentViewName}
                        onCurrentViewNameChange={this.currentViewNameChange}
                        onCurrentDateChange={this.currentDateChange}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        onEditingAppointmentChange={this.onEditingAppointmentChange}
                        onAddedAppointmentChange={this.onAddedAppointmentChange}
                    />
                    <DayView

                    />
                    <WeekView

                    />
                    <MonthView
                    />
                    <AllDayPanel/>
                    <EditRecurrenceMenu/>
                    <Appointments />
                    <AppointmentTooltip
                        showCloseButton
                    />
                    <Toolbar
                        {...loading ? { rootComponent: ToolbarWithLoading } : null}
                    />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <AppointmentForm
                        overlayComponent={this.appointmentForm}
                        visible={editingFormVisible}
                        onVisibilityChange={this.toggleEditingFormVisibility}
                    />
                    <DragDropProvider/>

                </Scheduler>




            </Paper>
        );
    }
}
export default Calender;
