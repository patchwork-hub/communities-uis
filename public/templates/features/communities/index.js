///@ts-nocheck
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import CommunityIcon from '@/material-icons/400-24px/community.svg?react';
import Column from 'mastodon/components/column';
import ColumnHeader from 'mastodon/components/column_header';
import Statuses from '../explore/statuses';
const CommunitiesTimeline = () => {
    const columnRef = useRef(null);
    return (<Column label={'Communities'} bindToDocument={false} ref={columnRef}>
      <ColumnHeader icon='community' iconComponent={CommunityIcon} title='Communities' multiColumn={false}/>
      <div className='account__section-headline'>
        <NavLink exact to='/communities'>
          <FormattedMessage tagName='div' id='community.local' defaultMessage='Local Communities'/>
        </NavLink>

        <NavLink exact to='/communities'>
          <FormattedMessage tagName='div' id='community.all' defaultMessage='All Communities'/>
        </NavLink>
      </div>
      <Statuses multiColumn={false}/>
    </Column>);
};
export default CommunitiesTimeline;
