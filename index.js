
"use strict";

const Alexa = require("alexa-sdk");
const APP_ID = undefined;

const languageStrings = {
    "en-GB": {
        translation: {
            FACTS: [
                "Andrew Yak-Tak NG is a Chinese-American computer scientists.",
                "Andrew is the former chief scientist of Baidu, the Google of China where he specialised in Artificial Intelligence.",
                "Andrew used to be a professor at Stanford University.",
                "Andrew is the co-founder of the online education platform called Coursera.",
                "Andrew is very well known for his machine learning and deep learning online courses.",
                "He was born in the UK in 1976.",
                "Andrew has grown up in Hong Kong and Singapore.",
                "Andrew studied at M.I.T for his masters degree.",
                "Andrew has worked at Google where he led the Google Brain Deep learning project.",
                "His thesis was called Shaping and Policy search in reinforcement learning.",
                "Andrew is the author or the co-author of over 100 published papers in machine learning, robotics and related fields."
            ],
            SKILL_NAME: "Unofficial Andrew Ng Facts",
        },
    }
};

const handlers = {
    "LaunchRequest": function () {
        this.emit("GetAndrewFact");
    },
    "GetAndrewFact": function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t("FACTS");
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = randomFact;
        this.emit(":tellWithCard", speechOutput, this.t("SKILL_NAME"), randomFact);
    },
    "AMAZON.HelpIntent": function () {
        const speechOutput = this.t("HELP_MESSAGE");
        const reprompt = this.t("HELP_MESSAGE");
        this.emit(":ask", speechOutput, reprompt);
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("STOP_MESSAGE"));
    },
    "AMAZON.StopIntent": function () {
        this.emit(":tell", this.t("STOP_MESSAGE"));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
