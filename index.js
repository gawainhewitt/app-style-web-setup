const EventBinders = require('./eventBinders');
const EventHandlers = require('./eventHandlers');

const eventBinders = new EventBinders;
const eventHandlers = new EventHandlers(eventBinders);
