import { useRef } from "react";

import { FormattedMessage } from "react-intl";

import { NavLink, Route, Switch } from "react-router-dom";

import CommunityIcon from "@/material-icons/400-24px/community.svg?react";
import Column from "mastodon/components/column";
import ColumnHeader from "mastodon/components/column_header";

import AllCommunities from "./all_communities";
import LocalCommunities from "./local_communities";

const CommunitiesTimeline = () => {
  const columnRef = useRef<Column>(null);
  return (
    <Column label={"Communities"} bindToDocument={false} ref={columnRef}>
      <ColumnHeader
        icon="community"
        iconComponent={CommunityIcon}
        title="Communities"
        multiColumn={false}
      />
      <div className="community__section-headline">
        <NavLink exact to="/communities/local">
          <FormattedMessage
            tagName="div"
            id="community.local"
            defaultMessage="Local Communities"
          />
        </NavLink>

        <NavLink exact to="/communities/all">
          <FormattedMessage
            tagName="div"
            id="community.all"
            defaultMessage="All Communities"
          />
        </NavLink>
      </div>
      <Switch>
        <Route path="/communities/local" component={LocalCommunities} />
        <Route path="/communities/all" component={AllCommunities} />
      </Switch>
    </Column>
  );
};

export default CommunitiesTimeline;
