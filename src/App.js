import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {Button, Divider, Header, Segment} from "semantic-ui-react";

export default function App() {
    const [count1, setCount1] = useState(30);
    const [count2, setCount2] = useState(30);
    const [interval, setIntervalState] = useState(null);

    const [count1State, setCount1State] = useState(null)

    const [count2State, setCount2State] = useState(null)

    useInterval(() => {
        setCount1(count1 + count1State);
        setCount2(count2 + count2State);
    }, interval);

    return (
        <div align='middle'>


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


            <Button
                onClick={() => {
                    setCount1(30);
                    setCount2(30);
                }}
            >
                Reset Count
            </Button>

            <Button
                onClick={() => {
                    setIntervalState(null);
                }}
            >
                Pause Interval
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

            //cleaning function set for the future (autoexecuted when "delay" change)
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}
