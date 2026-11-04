
/* =================================
   HTML ADVANCED QUIZ
   Quiz Engine
================================= */

const questions = [
  {
    question: "Qual tag representa um conteúdo independente e autocontido, como um artigo de blog?",
    type: "single",
    options: [
      "<section>",
      "<article>",
      "<aside>",
      "<main>"
    ],
    answer: [1],
    explanations: [
      "Section representa uma seção temática.",
      "Article representa conteúdo independente e autocontido.",
      "Aside representa conteúdo complementar.",
      "Main representa o conteúdo dominante da página."
    ]
  },
  {
    question: "Qual elemento HTML oferece uma caixa de diálogo nativa que pode ser aberta como modal?",
    type: "single",
    options: [
      "<dialog>",
      "<details>",
      "<output>",
      "<template>"
    ],
    answer: [0],
    explanations: [
      "Dialog permite criar diálogos nativos e usar showModal().",
      "Details cria conteúdo expansível.",
      "Output representa o resultado de uma operação.",
      "Template armazena conteúdo HTML inerte."
    ]
  },
  {
    question: "Quais recursos podem ser utilizados com a tag picture?",
    type: "multiple",
    options: [
      "Imagens diferentes conforme media queries",
      "Formatos alternativos com o atributo type",
      "Substituir obrigatoriamente o elemento img",
      "Um elemento img como fallback"
    ],
    answer: [0, 1, 3],
    explanations: [
      "Picture pode selecionar fontes com base em media.",
      "Source pode informar formatos alternativos com type.",
      "Picture não substitui img. O elemento img é necessário.",
      "O img interno funciona como fallback."
    ]
  },
  {
    question: "O elemento template permite armazenar conteúdo HTML que não é renderizado imediatamente e pode ser clonado com JavaScript.",
    type: "truefalse",
    options: ["Verdadeiro", "Falso"],
    answer: [0],
    explanations: [
      "Template armazena conteúdo inerte, disponível pela propriedade content.",
      "A afirmação está correta: o conteúdo pode ser reutilizado com cloneNode()."
    ]
  },
  {
    question: "Qual atributo permite ao navegador sugerir o preenchimento de dados anteriores em um formulário?",
    type: "single",
    options: [
      "placeholder",
      "autocomplete",
      "pattern",
      "inputmode"
    ],
    answer: [1],
    explanations: [
      "Placeholder apresenta uma dica visual.",
      "Autocomplete orienta o preenchimento automático do navegador.",
      "Pattern define regras de validação.",
      "Inputmode sugere o tipo de teclado virtual."
    ]
  },
  {
    question: "Como associar corretamente um label a um input fora do seu conteúdo?",
    type: "single",
    options: [
      "label com atributo name",
      "label com atributo target",
      "label for correspondente ao id do input",
      "label com atributo aria-label"
    ],
    answer: [2],
    explanations: [
      "Name não estabelece essa associação.",
      "Target não é o atributo utilizado para isso.",
      "O valor de for deve corresponder ao id do input.",
      "Aria-label fornece um nome acessível, mas não cria essa associação nativa."
    ]
  },
  {
    question: "O atributo loading='lazy' garante que todas as imagens sejam carregadas imediatamente.",
    type: "truefalse",
    options: ["Verdadeiro", "Falso"],
    answer: [1],
    explanations: [
      "Lazy loading adia o carregamento de imagens que ainda não são necessárias.",
      "A afirmação está correta: o carregamento pode ser adiado conforme a posição da imagem."
    ]
  },
  {
    question: "Qual metadado é essencial para configurar o viewport de dispositivos móveis?",
    type: "single",
    options: [
      "meta name='viewport'",
      "meta name='description'",
      "meta charset='UTF-8'",
      "meta name='author'"
    ],
    answer: [0],
    explanations: [
      "Viewport permite configurar a largura e a escala inicial da página.",
      "Description fornece uma descrição da página.",
      "Charset define a codificação de caracteres.",
      "Author identifica o autor do documento."
    ]
  },
  {
    question: "Quais são boas práticas ao utilizar iframes em aplicações profissionais?",
    type: "multiple",
    options: [
      "Definir um title descritivo",
      "Avaliar loading='lazy'",
      "Utilizar sandbox quando apropriado",
      "Permitir indiscriminadamente todas as permissões"
    ],
    answer: [0, 1, 2],
    explanations: [
      "Title melhora a identificação do conteúdo para tecnologias assistivas.",
      "Lazy pode adiar o carregamento do iframe.",
      "Sandbox permite restringir capacidades do conteúdo incorporado.",
      "Conceder permissões indiscriminadamente não é seguro."
    ]
  },
  {
    question: "Qual é a função do elemento summary dentro de details?",
    type: "single",
    options: [
      "Definir conteúdo sempre visível",
      "Criar o título interativo do componente",
      "Criar uma janela modal",
      "Armazenar HTML invisível"
    ],
    answer: [1],
    explanations: [
      "O conteúdo adicional fica em details, fora de summary.",
      "Summary é o rótulo interativo do componente expansível.",
      "Dialog é utilizado para diálogos.",
      "Template armazena conteúdo HTML inerte."
    ]
  }
];

// ELEMENTOS DA INTERFACE

const screens = {
  welcome: document.getElementById("welcome-screen"),
  quiz: document.getElementById("quiz-screen"),
  result: document.getElementById("result-screen")
};

const elements = {
  start: document.getElementById("start-btn"),
  counter: document.getElementById("question-counter"),
  score: document.getElementById("score"),
  progress: document.getElementById("progress-bar"),
  progressContainer: document.getElementById("progress-container"),
  title: document.getElementById("question-title"),
  description: document.getElementById("question-description"),
  type: document.getElementById("question-type"),
  options: document.getElementById("options-container"),
  feedback: document.getElementById("feedback"),
  confirm: document.getElementById("confirm-btn"),
  next: document.getElementById("next-btn"),
  restart: document.getElementById("restart-btn")
};

// ESTADO DO JOGO

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let selectedAnswers = [];
let answered = false;

const POINTS_PER_QUESTION = 10;

// CONTROLE DAS TELAS

function showScreen(screenName) {
  Object.values(screens).forEach(screen => {
    screen.classList.add("hidden");
  });

  screens[screenName].classList.remove("hidden");
}

// INICIAR JOGO

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;

  showScreen("quiz");
  renderQuestion();
}

// RENDERIZAR PERGUNTA

function renderQuestion() {
  const question = questions[currentQuestion];

  selectedAnswers = [];
  answered = false;

  const number = currentQuestion + 1;

  elements.counter.textContent =
    `QUESTÃO ${String(number).padStart(2, "0")} DE ${questions.length}`;

  elements.score.textContent = `${score} pontos`;

  const progress = (currentQuestion / questions.length) * 100;

  elements.progress.style.width = `${progress}%`;
  elements.progressContainer.setAttribute("aria-valuenow", currentQuestion);

  elements.title.textContent = question.question;

  elements.description.textContent =
    question.type === "multiple"
      ? "Selecione todas as alternativas corretas."
      : "Selecione a alternativa correta.";

  const typeLabels = {
    single: "ESCOLHA ÚNICA",
    multiple: "MÚLTIPLA ESCOLHA",
    truefalse: "VERDADEIRO OU FALSO"
  };

  elements.type.textContent = typeLabels[question.type];

  elements.options.innerHTML = "";

  elements.feedback.className = "feedback hidden";
  elements.feedback.innerHTML = "";

  elements.confirm.classList.remove("hidden");
  elements.confirm.disabled = true;

  elements.next.classList.add("hidden");

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "option";

    button.setAttribute("aria-pressed", "false");

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = question.type === "truefalse"
      ? index === 0 ? "V" : "F"
      : String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.className = "option-text";
    text.textContent = option;

    button.append(letter, text);

    button.addEventListener("click", () => {
      selectOption(index, button);
    });

    elements.options.appendChild(button);
  });
}

// SELECIONAR ALTERNATIVA

function selectOption(index, button) {
  if (answered) return;

  const question = questions[currentQuestion];

  if (question.type !== "multiple") {
    selectedAnswers = [index];

    document.querySelectorAll(".option").forEach(option => {
      option.classList.remove("selected");
      option.setAttribute("aria-pressed", "false");
    });
  } else {
    if (selectedAnswers.includes(index)) {
      selectedAnswers = selectedAnswers.filter(
        answer => answer !== index
      );
    } else {
      selectedAnswers.push(index);
    }
  }

  button.classList.toggle(
    "selected",
    selectedAnswers.includes(index)
  );

  button.setAttribute(
    "aria-pressed",
    String(selectedAnswers.includes(index))
  );

  elements.confirm.disabled = selectedAnswers.length === 0;
}

// CONFIRMAR RESPOSTA

function confirmAnswer() {
  if (answered || selectedAnswers.length === 0) return;

  answered = true;

  const question = questions[currentQuestion];

  const isCorrect =
    selectedAnswers.length === question.answer.length &&
    selectedAnswers.every(answer =>
      question.answer.includes(answer)
    );

  if (isCorrect) {
    score += POINTS_PER_QUESTION;
    correctAnswers++;
  }

  elements.score.textContent = `${score} pontos`;

  const options = document.querySelectorAll(".option");

  options.forEach((option, index) => {
    option.disabled = true;

    if (question.answer.includes(index)) {
      option.classList.add("correct");
    } else if (selectedAnswers.includes(index)) {
      option.classList.add("incorrect");
    }
  });

  showFeedback(question, isCorrect);

  elements.confirm.classList.add("hidden");
  elements.next.classList.remove("hidden");

  elements.next.textContent =
    currentQuestion === questions.length - 1
      ? "Ver resultado →"
      : "Próxima questão →";

  elements.progress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  elements.progressContainer.setAttribute(
    "aria-valuenow",
    currentQuestion + 1
  );
}

// FEEDBACK EDUCATIVO

function showFeedback(question, isCorrect) {
  elements.feedback.classList.remove("hidden");

  elements.feedback.classList.add(
    isCorrect ? "success" : "error"
  );

  const title = document.createElement("strong");
  title.textContent = isCorrect
    ? "✓ Excelente! Você acertou."
    : "✕ Não foi dessa vez. Vamos aprender!";

  const explanation = document.createElement("p");

  explanation.textContent = question.explanations
    .map((text, index) => `${String.fromCharCode(65 + index)}: ${text}`)
    .join(" ");

  elements.feedback.replaceChildren(title, explanation);
}

// PRÓXIMA PERGUNTA

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// RESULTADO FINAL

function finishQuiz() {
  showScreen("result");

  const percentage = Math.round(
    (correctAnswers / questions.length) * 100
  );

  document.getElementById("final-score").textContent = score;
  document.getElementById("correct-count").textContent =
    correctAnswers;

  document.getElementById("wrong-count").textContent =
    questions.length - correctAnswers;

  document.getElementById("percentage").textContent =
    `${percentage}%`;

  let message;

  if (percentage === 100) {
    message = "Incrível! Você domina os conceitos deste desafio.";
  } else if (percentage >= 70) {
    message = "Excelente resultado! Você tem uma ótima base de HTML.";
  } else if (percentage >= 50) {
    message = "Bom trabalho! Continue aprimorando seus conhecimentos.";
  } else {
    message = "Continue estudando! Cada desafio é uma oportunidade.";
  }

  document.getElementById("result-message").textContent = message;
}

// EVENTOS

elements.start.addEventListener("click", startQuiz);
elements.confirm.addEventListener("click", confirmAnswer);
elements.next.addEventListener("click", nextQuestion);
elements.restart.addEventListener("click", startQuiz);
