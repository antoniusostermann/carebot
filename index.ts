import { AssistantJSSetup, StateMachineSetup } from "assistant-source";
import { descriptor as alexaDescriptor } from "assistant-alexa";
import { descriptor as validationsDescriptor, PromptState } from "assistant-validations";
import components from "./config/components";

/** 
 * Initialize assistant.js
 * The only requirement for assistantJs to work is to export an "assistantJs" object with the AssistantJSSetup configured.
 * Here, we are exporting all two used setups. Those setups are already initialized using the initializeSetups() function, see below.
 */
export const assistantJs = new AssistantJSSetup();
export const stateMachineSetup = new StateMachineSetup(assistantJs);

/**
 * Initializes all needed setup types. This makes the initialization process, which is needed for a running production environment, reusable for specs.
 * @param assistantJs AssistantJS Setup object to initialize 
 * @param stateMachineSetup StateMachineSetup object to initialize 
 * @param addOnly If set to true, states will only be added, but not registered in the dependency injection container
 */
export function initializeSetups (assistantJs: AssistantJSSetup, stateMachineSetup: StateMachineSetup, addOnly = false) {
  // Register all AssistantJS components
  assistantJs.registerComponent(alexaDescriptor);
  assistantJs.registerComponent(validationsDescriptor);

  // Configure components
  assistantJs.addConfiguration(components);

  // Register all states and strategies
  stateMachineSetup.addState(PromptState);
  stateMachineSetup.registerByConvention(addOnly);
}

// Initialize the exported production setups
initializeSetups(assistantJs, stateMachineSetup);