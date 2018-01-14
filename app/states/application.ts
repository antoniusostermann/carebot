import { unifierInterfaces, i18nInterfaces, BaseState } from "assistant-source";
import { injectable, unmanaged } from "inversify";

@injectable()
export class ApplicationState extends BaseState {
  responseFactory: unifierInterfaces.ResponseFactory;
  translateHelper: i18nInterfaces.TranslateHelper;

  constructor(@unmanaged() responseFactory: unifierInterfaces.ResponseFactory, @unmanaged() translateHelper: i18nInterfaces.TranslateHelper) {
    super(responseFactory, translateHelper);
  }

  /** "Cancel!" */
  cancelGenericIntent() {
    this.responseFactory.createVoiceResponse().endSessionWith(this.translateHelper.t());
  }

  /** "Help me!" */
  helpGenericIntent() {
    this.responseFactory.createVoiceResponse().prompt(this.translateHelper.t());
  }
}