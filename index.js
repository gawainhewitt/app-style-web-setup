const EventBinders = require('./eventBinders');
const EventHandlers = require('./eventHandlers');
const TouchHandler = require('./touchHandler');

const eventBinders = new EventBinders;
const eventHandlers = new EventHandlers(eventBinders);
const touchHandler = new TouchHandler(eventBinders);
