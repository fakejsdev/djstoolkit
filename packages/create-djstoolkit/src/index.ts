import { getAnswers } from "./prompts";
import { scaffold } from "./scaffold";

const answers = await getAnswers();
await scaffold(answers);
