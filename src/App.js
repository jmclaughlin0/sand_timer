import React, {useState, useEffect, useRef} from "react";
import {Button, Divider, Dropdown, Header, Modal, Segment} from "semantic-ui-react";
// import useSound from "use-sound";


export default function App() {

    const [timeInterval, setTimeInterval] = useState(30)
    const [count1, setCount1] = useState(30);
    const [count2, setCount2] = useState(30);
    const [interval, setIntervalState] = useState(null);

    const [count1State, setCount1State] = useState(null)

    const [count2State, setCount2State] = useState(null)

    const [modalOpen, setModalOpen] = useState(false)

    const [timerEnd, setTimerEnd] = useState(false)

    // const [playSound] = useSound('../public/alarm.mp3')

    const optionsList = [{value: 30, text: ' 30 s'}, {value: 45, text:  ' 45 s'}, {value: 60, text:  ' 60 s'}, {value: 90, text:  ' 90 s'}]

    useInterval(() => {
        if((count1&&count2)>0){
            setCount1(count1 + count1State);
            setCount2(count2 + count2State);
        }else{
            pauseClock()
            setTimerEnd(true)
            // playSound()
        }
    }, interval);


    function handleUpdate(data){
        setTimeInterval(data.value)
    }

    useEffect(()=>{
        setCount1(timeInterval)
        setCount2(timeInterval)
    }, [timeInterval])


    function resetClock(){
        setCount1(timeInterval);
        setCount2(timeInterval);
        setIntervalState(null);
    }

    function pauseClock() {
        setIntervalState(null);
    }


    return (
        <div align='center'>

            <Modal centered
                open={timerEnd}
            >
                <Button size={'small'} icon = 'close' onClick={() => setTimerEnd(false)}/>
                <Modal.Header>{"Time's Up!!!"}
                </Modal.Header>
            </Modal>

            <Modal
                open={modalOpen}
                >
                <Button size={'small'} icon = 'close' onClick={() => setModalOpen(false)}/>
                <Modal.Header>{"Input how many seconds you'd like each team to have: "}
                    <Dropdown
                        floating
                        options={optionsList}
                        defaultValue={optionsList[0].value}
                        onChange={(e,data) => handleUpdate(data)}
                    />
                </Modal.Header>

            </Modal>

            <div className = 'App-header'>
                <Segment placeholder inverted color = 'red'
                         onClick={() => {
                             setIntervalState(1000);
                             setCount1State(-1)
                             setCount2State(1)
                         }}
                >
                    <div>
                        <Header as = 'h3'>Team 1:</Header>
                        <Divider/>
                        <Header as = 'h1'> {count1} </Header>
                    </div>
                </Segment>

                <Divider section/>
                <Segment placeholder inverted color = 'blue'
                         onClick={() => {
                             setIntervalState(1000);
                             setCount1State(1)
                             setCount2State(-1)
                         }}
                >
                    <div>
                        <Header as = 'h3'>Team 2:</Header>
                        <Divider/>
                        <Header as = 'h1'> {count2} </Header>
                    </div>
                </Segment>
            </div>

            <Button
                onClick={() => {
                    resetClock()
                }}
            >
                Reset Count
            </Button>

            <Button
                onClick={() => {
                    pauseClock()
                }}
            >
                Pause Interval
            </Button>

            <Button onClick={() => setModalOpen(true)}>
                Set Team Times
            </Button>

        </div>


    );
}

/* Dan Abramov useInterval hook - https://overreacted.io/making-setinterval-declarative-with-react-hooks/ */

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);

            //cleaning function set for the future (auto-executed when "delay" change)
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}
