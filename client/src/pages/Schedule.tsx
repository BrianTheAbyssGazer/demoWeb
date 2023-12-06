import { Row,Col,Button } from 'react-bootstrap';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
 
function Schedule() {
    const eventStyleGetter = (event: EventType) => {
        const style = {
            backgroundColor: event.color,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });
    const localizer = momentLocalizer(moment)
    type EventType = {
        title: string | undefined;
        start: Date | null;
        end: Date | null;
        color: string;
        allDay: boolean
    };
    const [newEvent, setNewEvent] = useState<EventType>({ title: "", start: new Date(), end: new Date(), color:"#ffffff", allDay:true});
    const [selectedEvent, setSelectedEvent] = useState<EventType|null>({ title: "", start: new Date(), end: new Date(), color: "#ffffff", allDay: true });
    const [allEvents, setAllEvents] = useState<Set<EventType>>(new Set<EventType>([]));
    type OptionType = {
        label: string;
        value: string;
        isDisabled?: boolean;
        color: string
    };
    const eventOptions: OptionType[] = [{ value: "Choose an Activity", label: "Choose an Activity", isDisabled: true, color: "#ffffff" },
        { value: "Fasting", label: "Fasting", color: "#ebfc57" },
        { value: "Cold Exposure", label: "Cold Exposure", color: "#6264c3" },
        { value: "Sauna", label: "Sauna", color: "#fb875b" },
        { value: "Hyperbaric Oxygen Therapy", label: "Hyperbaric Oxygen Therapy", color: "#a1ff79" },
        { value: "Resistance Training", label: "Resistance Training", color: "#ff4f4f" },
        { value: "Aerobic Exercise", label: "Aerobic Exercise", color: "#4ffffa" },] 
    const colourStyles: StylesConfig<OptionType> = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    const repeatOptions = [{ value: "don't repeat", label: "don't repeat" },
        { value: "every week", label: "every week" },
        { value: "every month", label: "every month" },]
    function addEvent() {
        if (newEvent.title != "") {
            setSelectedEvent(() => { return newEvent });
            setAllEvents(allEvents.add(newEvent));
            }
    }
    function deleteEvent() {
        if (selectedEvent) {
            setAllEvents(() => {
                allEvents.delete(selectedEvent);
                return allEvents;
            });
            setSelectedEvent(() => { return null });
        }
    }
    function modifyEvent() {
        if (selectedEvent && newEvent.title) {
            setAllEvents(() => {
                allEvents.delete(selectedEvent);
                return allEvents.add(newEvent)
            });
            console.log([...allEvents]);
            setSelectedEvent(() => { return newEvent });
        }
    }
    return (
        <Row className="justify-content-center m0 schedule">
            <Col className="col-12 h-75">
                <Calendar localizer={localizer} events={[...allEvents]} startAccessor="start" endAccessor="end"
                    views={['month', 'week', 'agenda']} eventPropGetter={eventStyleGetter}
                    onSelectEvent={(e) => { setSelectedEvent(e) }} />
            </Col>
            <Col className="d-grid align-items-center justify-content-evenly h-25">
                <Row>
                    <Col>
                        <Select defaultValue={eventOptions[0]} options={eventOptions} styles={colourStyles} 
                            onChange={(e) => setNewEvent({ ...newEvent, title: (e as OptionType)?.value, color: (e as OptionType)?.color })} />
                    </Col>
                    <Col>
                        <Select defaultValue={repeatOptions[0]} options={repeatOptions} />
                    </Col>
                    <Col>
                        <DatePicker placeholderText="Start Date" selected={newEvent.start} showIcon popperPlacement="bottom"
                            onChange={(start) => setNewEvent({ ...newEvent, start })} popperModifiers={[{name:"flip",
                            options:{flipVariations:false}},
                            {name: "preventOverflow",options:{mainAxis:false, altAxis: false}}
                            ]} />
                    </Col>
                    <Col>
                        <DatePicker placeholderText="End Date" selected={newEvent.end} showIcon popperPlacement="bottom"
                            onChange={(end) => setNewEvent({ ...newEvent, end })} popperModifiers={[{name:"flip",
                            options:{flipVariations:false}},
                            {name: "preventOverflow",options:{mainAxis:false, altAxis: false}}
                            ]}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={modifyEvent}>Modify Activity</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={addEvent}>Add Activity</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={deleteEvent}>Delete Activity</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={() => { setAllEvents(new Set<EventType>([])) }}>Delete All Activity</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Schedule;