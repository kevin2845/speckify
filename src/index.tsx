import {
    ButtonItem,
    PanelSection,
    PanelSectionRow,
    Navigation,
    staticClasses
} from "@decky/ui";
import {
    addEventListener,
    removeEventListener,
    callable,
    definePlugin,
    toaster,
    // routerHook
} from "@decky/api"
import { useState } from "react";
import { FaShip } from "react-icons/fa";
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// import logo from "../assets/logo.png";

// This function calls the python function "add", which takes in two numbers and returns their sum (as a number)
// Note the type annotations:
//  the first one: [first: number, second: number] is for the arguments
//  the second one: number is for the return value
const add = callable<[first: number, second: number], number>("add");
const getTime = callable<[], string>("getTime");

// This function calls the python function "start_timer", which takes in no arguments and returns nothing.
// It starts a (python) timer which eventually emits the event 'timer_event'
const startTimer = callable<[], void>("start_timer");

//Instantiate spotify player 
const api = SpotifyApi.withClientCredentials(
    "66b556089f1c4541b46cf582879db410",
    "63989c7e83d64ed48defdb907fb237dd",
);
const items = await api.search("The Beatles", ["artist"]);
console.table(items.artists.items.map((item) => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
})));




function Content() {
    const [result, setResult] = useState<number | undefined>();
    const [time, setTime] = useState<string>();

    const onClick = async () => {
        const result = await add(Math.random(), Math.random());
        setResult(result);
    };
    const onClick2 = async () => {
        const result = await getTime();
        setTime(result);
        console.log(result);
        console.log(time);
    };

    return (
        <PanelSection title="backend tests">
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={onClick}
                >
                    {result ?? "Add two numbers via Python"}
                </ButtonItem>
            </PanelSectionRow>
            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={() => startTimer()}
                >
                    {"Start Python timer"}
                </ButtonItem>
            </PanelSectionRow>

            <PanelSectionRow>
                <ButtonItem
                    layout="below"
                    onClick={onClick2}
                >
                    {time ?? "get the current time"}
                </ButtonItem>
            </PanelSectionRow>

            {/* <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow> */}

            {/*<PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.Navigate("/decky-plugin-test");
            Navigation.CloseSideMenus();
          }}
        >
          Router
        </ButtonItem>
      </PanelSectionRow>*/}
        </PanelSection>
    );
};

export default definePlugin(() => {
    console.log("Template plugin initializing, this is called once on frontend startup")

    // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
    //   exact: true,
    // });

    // Add an event listener to the "timer_event" event from the backend
    const listener = addEventListener<[
        test1: string,
        test2: boolean,
        test3: number
    ]>("timer_event", (test1, test2, test3) => {
        console.log("Template got timer_event with:", test1, test2, test3)
        toaster.toast({
            title: "template got timer_event",
            body: `${test1}, ${test2}, ${test3}`
        });
    });

    return {
        // The name shown in various decky menus
        name: "Test Plugin",
        // The element displayed at the top of your plugin's menu
        titleView: <div className={staticClasses.Title}>Spotify Player</div>,
        // The content of your plugin's menu
        content: <Content />,
        // The icon displayed in the plugin list
        icon: <FaShip />,
        // The function triggered when your plugin unloads
        onDismount() {
            console.log("Unloading")
            removeEventListener("timer_event", listener);
            // serverApi.routerHook.removeRoute("/decky-plugin-test");
        },
    };
});
