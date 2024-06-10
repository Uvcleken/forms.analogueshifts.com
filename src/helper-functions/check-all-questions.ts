export function checkAllQuestionFields(questions: any, toast: any) {
  let returnValue = true;
  questions.forEach((item: any) => {
    if (
      (item.required === "1" && item.answer === null) ||
      (item.required === "1" && item.answer !== null && !item.answer[0])
    ) {
      returnValue = false;
      toast("Missing Field", item.question);
    }
  });

  return returnValue;
}
