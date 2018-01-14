import { stateMachineInterfaces, injectionNames, unifierInterfaces, i18nInterfaces } from "assistant-source";
import { needs } from "assistant-validations";
import { injectable, inject } from "inversify";

import { ApplicationState } from "./application";

/**
 * If user had a bad day, he or she can tell us about the reason in this state.
 */

@injectable()
export class ReasonState extends ApplicationState {
  constructor(
    @inject(injectionNames.current.responseFactory) responseFactory: unifierInterfaces.ResponseFactory,
    @inject(injectionNames.current.translateHelper) translateHelper: i18nInterfaces.TranslateHelper
  ) {
    super(responseFactory, translateHelper);
  }

  /**
   * We are jumping into this method as soon as the user says he or she has a bad day.
   */
  invokeGenericIntent(machine: stateMachineInterfaces.Transitionable) {
    this.responseFactory.createVoiceResponse().prompt(this.translateHelper.t());
  }

  /** "My collegues have been mean! " */
  @needs("colleague")
  unfriendlyColleaguesIntent(machine: stateMachineInterfaces.Transitionable) {
    this.responseFactory.createVoiceResponse().endSessionWith(this.translateHelper.t())
  }

  /** In parental BaseState, unhandledGenericIntent uses prompt(). Let's switch this to endSession(). */
  unhandledGenericIntent(machine: stateMachineInterfaces.Transitionable) {
    this.responseFactory.createVoiceResponse().endSessionWith(this.translateHelper.t());
  }
}