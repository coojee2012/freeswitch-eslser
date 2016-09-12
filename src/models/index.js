/**
 * Created by linyong on 9/12/16.
 */
import ActionType from './schemas/actionTypes';
import BlackList from './schemas/blackLists';
import CallProcess from './schemas/callProcesses';
import Cdr from './schemas/cdrs';
import Conference from './schemas/conferences';
import ExtensionGroup from './schemas/extensionGroups';
import Extension from './schemas/extensions';
import IvrAction from './schemas/ivrActions';
import IvrInput from './schemas/ivrInputs';
import IvrMenu from './schemas/ivrMenus';
import LocalNumber from './schemas/localNumbers';
import Queue from './schemas/queues';
import RecordFile from './schemas/recordFiles';
import Router from './schemas/routers';
import Sound from './schemas/sounds';
import Trunk from './schemas/trunks';

const DBModules = {
  "pbx_actionTypes": ActionType,
  'pbx_blackLists':BlackList,
  'pbx_callProcesses':CallProcess,
  'pbx_cdrs':Cdr,
  'pbx_conferences':Conference,
  'pbx_extensionGroups':ExtensionGroup,
  'pbx_extensions':Extension,
  'pbx_ivrActions':IvrAction,
  'pbx_ivrInputs':IvrInput,
  'pbx_ivrMenus':IvrMenu,
  'pbx_localNumbers':LocalNumber,
  'pbx_queues':Queue,
  'pbx_recordFiles':RecordFile,
  'pbx_routers':Router,
  'pbx_sounds':Sound,
  'pbx_trunks':Trunk,
}
export default DBModules;
