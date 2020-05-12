
import React,{Component} from "react";
import {

    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Button, Alert,
} from "reactstrap";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import NavbarProfile from "../../components/Navbars/NavbarProfile";
import NavBarTeacher from "../../components/Navbars/NavBarTeacher";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import jwt_decode from "jwt-decode";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
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

const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';



const makeQueryString = (currentDate, currentViewName) => {
    const format = 'YYYY-MM-DDTHH:mm:ss';
    const start = moment(currentDate).startOf(currentViewName.toLowerCase());
    const end = start.clone().endOf(currentViewName.toLowerCase());
    return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};

const containerStyles = theme => ({
    container: {
        width: theme.spacing(68),
        padding: 0,
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2),
        paddingTop: 0,
    },
    header: {
        overflow: 'hidden',
        paddingTop: theme.spacing(0.5),
    },
    closeButton: {
        float: 'right',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    picker: {
        marginRight: theme.spacing(2),
        '&:last-child': {
            marginRight: 0,
        },
        width: '50%',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1, 0),
    },
    icon: {
        margin: theme.spacing(2, 0),
        marginRight: theme.spacing(2),
    },
    textField: {
        width: '100%',
    },
});
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
    title: appointment.nom,
    startDate: appointment.datedebut,
    endDate: appointment.datefin,
    nbplace: appointment.nbplace
});

class AppointmentFormContainerBasic extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            appointmentChanges: {},
        };

        this.getAppointmentData = () => {
            const { appointmentData } = this.props;
            return appointmentData;
        };
        this.getAppointmentChanges = () => {
            const { appointmentChanges } = this.state;
            return appointmentChanges;
        };

        this.changeAppointment = this.changeAppointment.bind(this);
        this.commitAppointment = this.commitAppointment.bind(this);
    }

    changeAppointment({ field, changes }) {
        const nextChanges = {
            ...this.getAppointmentChanges(),
            [field]: changes,
        };
        this.setState({
            appointmentChanges: nextChanges,
        });
    }

    commitAppointment(type) {
        const { commitChanges } = this.props;
        const appointment = {
            ...this.getAppointmentData(),
            ...this.getAppointmentChanges(),
        };
        if (type === 'deleted') {
            commitChanges({ [type]: appointment.id });
        } else if (type === 'changed') {
            commitChanges({ [type]: { [appointment.id]: appointment } });
        } else {
            commitChanges({ [type]: appointment });
        }
        this.setState({
            appointmentChanges: {},
        });
    }

    render() {
        const {
            classes,
            visible,
            visibleChange,
            appointmentData,
            cancelAppointment,
            target,
            onHide,
        } = this.props;
        const { appointmentChanges } = this.state;

        const displayAppointmentData = {
            ...appointmentData,
            ...appointmentChanges,
        };

        const isNewAppointment = appointmentData.id === undefined;
        const applyChanges = isNewAppointment
            ? () => this.commitAppointment('added')
            : () => this.commitAppointment('changed');

        const textEditorProps = field => ({
            variant: 'outlined',
            onChange: ({ target: change }) => this.changeAppointment({
                field: [field], changes: change.value,
            }),
            value: displayAppointmentData[field] || '',
            label: field[0].toUpperCase() + field.slice(1),
            className: classes.textField,
        });

        const pickerEditorProps = field => ({
            className: classes.picker,
            // keyboard: true,
            ampm: false,
            value: displayAppointmentData[field],
            onChange: date => this.changeAppointment({
                field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
            }),
            inputVariant: 'outlined',
            format: 'DD/MM/YYYY HH:mm',
            onError: () => null,
        });

        const cancelChanges = () => {
            this.setState({
                appointmentChanges: {},
            });
            visibleChange();
            cancelAppointment();
        };

        return (
            <AppointmentForm.Overlay
                visible={visible}
                target={target}
                fullSize
                onHide={onHide}
            >
                <div>
                    <div className={classes.header}>
                        <IconButton
                            className={classes.closeButton}
                            onClick={cancelChanges}
                        >
                            <Close color="action" />
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <div className={classes.wrapper}>
                            <Create className={classes.icon} color="action" />
                            <TextField
                                {...textEditorProps('title')}
                            />
                        </div>
                        <div className={classes.wrapper}>
                            <CalendarToday className={classes.icon} color="action" />
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDateTimePicker
                                    label="Start Date"
                                    {...pickerEditorProps('startDate')}
                                />
                                <KeyboardDateTimePicker
                                    label="End Date"
                                    {...pickerEditorProps('endDate')}
                                />

                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.wrapper}>
                            <LocationOn className={classes.icon} color="action" />
                            <TextField
                                {...textEditorProps('location')}
                            />
                        </div>
                        <div className={classes.wrapper}>
                            <Notes className={classes.icon} color="action" />
                            <TextField
                                {...textEditorProps('notes')}
                                multiline
                                rows="6"
                            />
                        </div>
                    </div>
                    <div className={classes.buttonGroup}>
                        {!isNewAppointment && (
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                onClick={() => {
                                    visibleChange();
                                    this.commitAppointment('deleted');
                                }}
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => {
                                visibleChange();
                                applyChanges();
                            }}
                        >
                            {isNewAppointment ? 'Create' : 'Save'}
                        </Button>

                    </div>
                </div>
            </AppointmentForm.Overlay>
        );
    }
}

const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);
class Workshopcalender extends  Component {
    constructor(props){
        super(props)
        this.state = {m: [],x:[],ms:'',
            activeTab:"",tab1:'',show2:false,tab2:'',show:false,show1:false,
            visible1: false,
            visible2: false,
            visible3: false,
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


        this.appointmentForm = connectProps( AppointmentFormContainer,() => {
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
        axios.get("http://localhost:3000/WS/allworkshop").then(res => {
            this.setState({tab1:res.data})
            console.log('succes')

        });
    }
    loadData() {
        const { currentDate, currentViewName } = this.state;
        const queryString = makeQueryString(currentDate, currentViewName);
        if (queryString === this.lastQuery) {
            this.setState({ loading: false });
            return;
        }
        axios.get('http://localhost:3000/WS/allworkshop')
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
    toggle  (tab) {
        if(this.state.activeTab!==tab){
            this.setState({activeTab:tab})
        }
    }
    onDismiss1(){
        this.setState({visible1:false})
    }
    onDismiss2(){
        this.setState({visible2:false})
    }
    onDismiss3(){
        this.setState({visible3:false})
    }

    delete(a) {
        const bod={idws:a,
            ide:jwt_decode(localStorage.token).user._id}
        console.log(bod)
        axios.post("http://localhost:3000/ws/reserver",bod).then(res => {
            if(res.data==="il n\'ya plus de place"){
                this.setState({visible1:true})
            }
            else if(res.data==="USER EXIST"){
                this.setState({visible2:true})
            }
            else {
            // window.location.reload()
                this.setState({visible3:true})
            console.log("succes")}
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
        return (
            <>

                <ProfilePageHeader/>
                <NavbarProfile/>


                <div className="section profile-content">
                    <NavBarTeacher/>
                    <Container>

                        <div className="owner">

                            <div className="card">
                                <h4 className="card-title">
                                    {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}<br/>
                                </h4>
                                <h6 className="card-subtitle">{jwt_decode(localStorage.token).user.role}</h6>
                            </div>
                        </div>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="6">

                                <br/>
                                <br/>


                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                            </div>
                        </div>
                        <>
                            <ExamplesNavbar />
                            <div>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div className="nav-tabs-navigation">
                                                <div className="nav-tabs-wrapper">
                                                    <Nav id="tabs" role="tablist" tabs>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "1" ? "active" : ""}
                                                                onClick={() => {this.toggle("1")}}>
                                                                Workshop
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink
                                                                className={this.state.activeTab === "2" ? "active" : ""}
                                                                onClick={() => {this.toggle("2")}}>
                                                                Reservation
                                                            </NavLink>
                                                        </NavItem>

                                                    </Nav>
                                                </div>
                                            </div>
                                            <TabContent activeTab={this.state.activeTab} className="text-center">
                                                <TabPane tabId="1">
                                                    <Col className="ml-auto mr-auto">

                                                        <h1>Workshops Table</h1>
                                                        <br/>   <br/>   <br/>
                                                        <div className="table-responsive">

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
                                                        </div></Col>

                                                </TabPane>
                                                <TabPane tabId="2">
                                                    <Col className="ml-auto mr-auto">

                                                        <center><h1>Workshops Table</h1>
                                                            <Alert color="danger" isOpen={this.state.visible1} toggle={this.onDismiss1.bind(this)}>
                                                                <b>il n'ya plus de place</b>
                                                            </Alert>
                                                            <Alert color="danger" isOpen={this.state.visible2} toggle={this.onDismiss2.bind(this)}>
                                                                <b>USER EXIST</b>
                                                            </Alert>
                                                            <Alert color="danger" isOpen={this.state.visible3} toggle={this.onDismiss3.bind(this)}>
                                                                <b>réservation effectuer</b>
                                                            </Alert></center>
                                                        <br/>   <br/>   <br/>
                                                        <div className="table-responsive">

                                                            <center><table >
                                                                <thead >
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>description</th>
                                                                    <th>Start-date</th>
                                                                    <th>End-date</th>
                                                                    <th>Places number</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                                </thead>
                                                                {this.state.tab1   && this.state.tab1.map((work) =>  <tbody className="table table-active" key={work._id}  >

                                                                    <tr>
                                                                        <td>{work.nom}

                                                                        </td>
                                                                        <td>{work.description}</td>
                                                                        <td>{work.datedebut}</td>
                                                                        <td>{work.datefin}</td>
                                                                        <td>{work.nbplace}</td>
                                                                        <td>
                                                                            <Button className="btn-info" onClick={this.delete.bind(this , work._id)} >Reserver</Button>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                )}

                                                            </table>

                                                            </center>

                                                        </div></Col>

                                                </TabPane>
                                            </TabContent>

                                        </Col>

                                    </Row>

                                </Container>
                            </div>
                        </>

                    </Container>
                </div>
                <DemoFooter/>
            </>
        );
    }
}

export default Workshopcalender;
