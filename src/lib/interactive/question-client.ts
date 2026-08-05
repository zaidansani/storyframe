function setupOptionQuestion(form: HTMLFormElement, multiple: boolean) {
  const options = Array.from(form.querySelectorAll<HTMLLabelElement>(".question-option"));
  const feedback = form.querySelector<HTMLElement>(".question-feedback");
  const retry = form.querySelector<HTMLButtonElement>(".question-retry");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let allCorrect = true;

    for (const option of options) {
      const input = option.querySelector<HTMLInputElement>("input");
      const selected = Boolean(input?.checked);
      option.dataset.selected = String(selected);
      const isCorrect = option.dataset.correct === "true";
      if (selected !== isCorrect) allCorrect = false;
    }

    form.dataset.state = "answered";
    form.dataset.result = allCorrect ? "correct" : "incorrect";
    if (feedback) {
      feedback.textContent = allCorrect
        ? "Correct!"
        : multiple
          ? "Not quite — the correct options are highlighted."
          : "Not quite — the correct answer is highlighted.";
    }
  });

  retry?.addEventListener("click", () => {
    form.dataset.state = "unanswered";
    delete form.dataset.result;
    for (const option of options) {
      const input = option.querySelector<HTMLInputElement>("input");
      if (input) input.checked = false;
      delete option.dataset.selected;
    }
  });
}

function setupFillQuestion(form: HTMLFormElement) {
  const input = form.querySelector<HTMLInputElement>(".question-fill-input");
  const feedback = form.querySelector<HTMLElement>(".question-feedback");
  const retry = form.querySelector<HTMLButtonElement>(".question-retry");
  const caseSensitive = form.dataset.caseSensitive === "true";
  const answers: string[] = JSON.parse(form.dataset.answers ?? "[]");

  const normalize = (value: string) => {
    const trimmed = value.trim();
    return caseSensitive ? trimmed : trimmed.toLowerCase();
  };
  const normalizedAnswers = answers.map(normalize);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input) return;

    const isCorrect = normalizedAnswers.includes(normalize(input.value));
    input.dataset.correct = String(isCorrect);
    form.dataset.state = "answered";
    form.dataset.result = isCorrect ? "correct" : "incorrect";
    if (feedback) {
      feedback.textContent = isCorrect
        ? "Correct!"
        : `Not quite — the correct answer is "${answers[0]}".`;
    }
  });

  retry?.addEventListener("click", () => {
    form.dataset.state = "unanswered";
    delete form.dataset.result;
    if (input) {
      input.value = "";
      delete input.dataset.correct;
    }
  });
}

document.querySelectorAll<HTMLFormElement>("[data-question-root]").forEach((form) => {
  if (form.dataset.wired) return;
  form.dataset.wired = "true";

  const kind = form.dataset.kind;
  if (kind === "fill") {
    setupFillQuestion(form);
  } else {
    setupOptionQuestion(form, kind === "multiple");
  }
});
