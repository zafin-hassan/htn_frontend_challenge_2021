import Head from "next/head";
import EventContainer from "../components/EventContainer";
import styles from "../styles/Home.module.css";
import Auth from "./../components/Auth";
import { EventContext } from "./../context/EventContext";
import { useReducer } from "react";
import { initialState, loginReducer } from "./../reducers/index";

export default function Home() {
  const [currentState, dispatch] = useReducer(loginReducer, initialState);
  return (
    <div className="landing-container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <EventContext.Provider value={{ currentState, dispatch }}>
          <Auth />
          <EventContainer />
        </EventContext.Provider>
      </main>
    </div>
  );
}
