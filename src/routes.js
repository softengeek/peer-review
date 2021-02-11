import { Route, Switch } from "react-router-dom";
import App from "./App";
import { GiveFeedback } from "./components/GiveFeedback/GiveFeedback";
import { Layout } from "./components/Layout/Layout";
import { MyFeedback } from "./components/MyFeedback/MyFeedback";
import { NotFound } from "./components/NotFound/NotFound";
import { ThankYouPage } from "./components/Questions/ThankYouPage";

export const routes = (
  <Switch>
    <Route exact path="/">
      <App />
    </Route>
    <Route path="/give-feedback/:id">
      <Layout>
        <GiveFeedback />
      </Layout>
    </Route>
    <Route path="/thank-you">
      <Layout>
        <ThankYouPage />
      </Layout>
    </Route>
    <Route path="/my-feedback">
      <Layout>
        <MyFeedback />
      </Layout>
    </Route>
    <Route path="*">
      <Layout>
      <NotFound />

      </Layout>
    </Route>
  </Switch>
);
