import * as fakeRedis from "fakeredis";
import { i18nInterfaces, unifierInterfaces, servicesInterfaces } from "assistant-source";
import { Configuration as AlexaConfiguration } from "assistant-alexa";
import { Configuration as DialogflowConfiguration } from "assistant-apiai";

const i18nConfiguration: i18nInterfaces.Configuration = {
  // This is basically the i18next configuration. Check out https://www.i18next.com/ for more information!
  i18nextAdditionalConfiguration: {
    // This entry is needed and tells i18next where to find your language files.
    backend: {
      loadPath: process.cwd() + "/config/locales/{{lng}}/{{ns}}.json",
    },
    lngs: ["en"],
    fallbackLng: "en",
    // If you encouter problems with i18next, change this to true
    debug: false
  }
}

/**
 * Configuration for AssistantJS's unifier module. Also contains main entity configuration.
 */
const unifierConfiguration: unifierInterfaces.Configuration = {
  entities: {
    "firstName": ["colleague"]
  }
};

/**
 * Configures the redis instance to use. 
 * Currently uses fakeredis, you want to change this to a real redis endpoint for production usage!
 */
const servicesConfiguration: servicesInterfaces.Configuration = {
  redisClient: fakeRedis.createClient()
}

/** Configures Alexa component */
const alexaConfiguration: AlexaConfiguration = {
  applicationID: "amzn1.ask.skill.fad96e04-45aa-4e8e-afa2-d2b6116327fe",
  parameters: {
    "firstName": "AMAZON.DE_FIRST_NAME"
  },
  useVerifier: false
}

/** Configures Dialogflow/Apiai component */
const dialogflowConfiguration: DialogflowConfiguration = {
  authenticationHeaders: {
    "mysecretheaderfield": "mySecretHeaderValue"
  },
  entities: {
    "firstName": "@sys.given-name"
  }
};

/*
 * Each configuration must be mapped to it's corresponding component name.
 * The registration is done in index.ts.
 */
export default {
  "core:i18n": i18nConfiguration,
  "core:services": servicesConfiguration,
  "core:unifier": unifierConfiguration,
  "alexa": alexaConfiguration,
  "apiai": dialogflowConfiguration
}