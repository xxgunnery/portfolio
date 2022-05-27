import React from 'react'

import Props from "./ZirollFiles/Props"
import Tenzies from "./ZirollFiles/Tenzies"
import APIs from "./ZirollFiles/APIs"
import EventState from "./ZirollFiles/EventState"
import CondRender from './ZirollFiles/CondRender'
import Forms from './ZirollFiles/Forms'
import ArrayTrick from "./ZirollFiles/ArrayTrick"
import Travel from "./ZirollFiles/Travel"
import data from "./ZirollFiles/TravelData"
import monkey from "./images/karamja.png"
import { Box, Button } from '@chakra-ui/react'
import { cp } from 'fs'

function PracticeApps(props) {

    function reveal(compName) {
        for(let component in props.visible) {
            if(component === compName) {
                props.visible[compName] === "hidden" ?
                    props.setVisible(
                        visible => { return {...visible, [compName]: "visible"}}
                    ) : 
                    props.setVisible(
                        visible => { return {...visible, [compName]: "hidden"} }
                    )
            } else {
                props.setVisible(
                    visible => { return {...visible, [component]: "hidden"} }
                )
            }
        }

    } 

    return (
        <Box>
            { Object.keys(props.visible).map((key,index) => <Button fontSize={"20px"} key={key} bg="#FFB74D" m="10px 5px 10px 0px" onClick={() => reveal(key)}>{key}</Button>) }
        </Box>
    )
}

export default function Ziroll() {

    const [isNumComponents, setIsNumComponents] = React.useState(0)
    const [visible, setVisible] = React.useState(
        {
            Props: "hidden",
            ArrayTrick: "hidden",
            EventState: "hidden",
            CondRender: "hidden",
            Forms: "hidden",
            APIs: "hidden",
            Tenzies: "hidden",
        }
    )

    return(
        <div>
            <PracticeApps visible={visible} setVisible={setVisible}/>
            <Props 
                img={monkey}
                name="Karamja Monka"
                class={visible.Props}
                alt="hello world"
            />
            <ArrayTrick 
                class={visible.ArrayTrick}
            />
            <EventState
                class={visible.EventState}
                numComponents={isNumComponents}
                setNumComponents={setIsNumComponents}
            />
            <CondRender
                class={visible.CondRender}
            />
            <Forms
                class={visible.Forms}
            />
            <APIs
                class={visible.APIs}
            />
            <Tenzies
                class={visible.Tenzies}
            />
        </div>
    )
}