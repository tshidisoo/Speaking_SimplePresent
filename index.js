// script.js

// Quiz Questions Data
const quizQuestions = [
  {
    question: "What time does James usually wake up?",
    options: ["6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM"],
    correct: 1,
  },
  {
    question: "What does James usually eat for breakfast?",
    options: [
      "Cereal and milk",
      "Eggs and bread",
      "Toast and jam",
      "Fruit and yogurt",
    ],
    correct: 1,
  },
  {
    question: "How does Anna usually go to school?",
    options: [
      "She walks",
      "She takes the bus",
      "Her parents drive her",
      "She rides a bike",
    ],
    correct: 1,
  },
  {
    question: "What does James do after school?",
    options: [
      "He reads books",
      "He watches TV",
      "He does homework and plays football",
      "He helps at home",
    ],
    correct: 2,
  },
  {
    question: "Does Anna play sports?",
    options: [
      "Yes, she plays football",
      "Yes, she plays tennis",
      "No, she doesn't",
      "Sometimes",
    ],
    correct: 2,
  },
  {
    question: "What time does Anna go to bed?",
    options: ["9 o'clock", "10 o'clock", "11 o'clock", "12 o'clock"],
    correct: 1,
  },
];

// Speaking Practice Questions Data
const speakingQuestions = [
  {
    question: "What time do you usually wake up?",
    example: "I usually wake up at 7 o'clock.",
  },
  {
    question: "Do you eat breakfast every day?",
    example:
      "Yes, I do. I eat cereal and drink orange juice. / No, I don't. I usually just drink coffee.",
  },
  {
    question: "How do you go to work or school?",
    example:
      "I take the bus to work. / I walk to school because it's near my house.",
  },
  {
    question: "What do you do in the evening?",
    example: "I watch TV and do my homework. / I cook dinner and read books.",
  },
  {
    question: "What time do you go to bed?",
    example:
      "I go to bed at 10:30 PM. / I usually go to bed around 11 o'clock.",
  },
  {
    question: "Do you like sports? What sports do you play?",
    example:
      "Yes, I do. I play basketball twice a week. / No, I don't. I prefer reading books.",
  },
  {
    question: "What do you do on weekends?",
    example:
      "I visit my family and go shopping. / I sleep late and watch movies.",
  },
  {
    question: "Do you cook your own meals?",
    example:
      "Yes, I do. I cook dinner every day. / No, I don't. My mother cooks for me.",
  },
];

// Audio synthesis function
function speakText(text, voice = "female") {
  if ("speechSynthesis" in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings
    utterance.rate = 0.8; // Slower for learners
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to set appropriate voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (voice === "anna" || voice === "teacher") {
        // Try to find a female voice
        const femaleVoice = voices.find(
          (v) =>
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("woman") ||
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("susan")
        );
        if (femaleVoice) utterance.voice = femaleVoice;
      } else if (voice === "james") {
        // Try to find a male voice
        const maleVoice = voices.find(
          (v) =>
            v.name.toLowerCase().includes("male") ||
            v.name.toLowerCase().includes("man") ||
            v.name.toLowerCase().includes("daniel") ||
            v.name.toLowerCase().includes("alex")
        );
        if (maleVoice) utterance.voice = maleVoice;
      }
    }

    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support text-to-speech.");
  }
}

// Initialize quiz
function initializeQuiz() {
  const quizContainer = document.getElementById("quiz-container");

  quizQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";
    questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${question.question}</h3>
            <div class="quiz-options">
                ${question.options
                  .map(
                    (option, optionIndex) => `
                    <label class="quiz-option">
                        <input type="radio" name="question${index}" value="${optionIndex}">
                        <span>${option}</span>
                    </label>
                `
                  )
                  .join("")}
            </div>
        `;
    quizContainer.appendChild(questionDiv);
  });
}

// Initialize speaking practice
function initializeSpeakingPractice() {
  const speakingContainer = document.getElementById("speaking-questions");

  speakingQuestions.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "speaking-question";
    questionDiv.innerHTML = `
            <h3>${index + 1}. ${item.question}</h3>
            <button class="practice-btn" onclick="speakText('${item.question.replace(
              /'/g,
              "\\'"
            )}', 'teacher')">🔊 Listen to Question</button>
            <div class="speaking-example">
                <strong>Example answer:</strong> ${item.example}
                <br><button class="practice-btn" onclick="speakText('${item.example.replace(
                  /'/g,
                  "\\'"
                )}', 'anna')" style="margin-top: 5px;">🔊 Listen to Example</button>
            </div>
        `;
    speakingContainer.appendChild(questionDiv);
  });
}

// Submit quiz function
function submitQuiz() {
  let score = 0;
  const totalQuestions = quizQuestions.length;

  quizQuestions.forEach((question, index) => {
    const selectedOption = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    const questionDiv = document.querySelectorAll(".quiz-question")[index];

    if (selectedOption) {
      const selectedValue = parseInt(selectedOption.value);
      if (selectedValue === question.correct) {
        score++;
        questionDiv.classList.add("correct");
      } else {
        questionDiv.classList.add("incorrect");
      }
    } else {
      questionDiv.classList.add("incorrect");
    }
  });

  // Show results
  const resultDiv = document.getElementById("quiz-result");
  const percentage = Math.round((score / totalQuestions) * 100);
  let message = "";

  if (percentage >= 80) {
    message = "🎉 Excellent work! You understand the dialogue very well!";
  } else if (percentage >= 60) {
    message = "👍 Good job! You got most of the answers right!";
  } else {
    message =
      "💪 Keep practicing! Listen to the dialogue again and try once more!";
  }

  resultDiv.innerHTML = `
        <h3>Quiz Results</h3>
        <p>You scored ${score} out of ${totalQuestions} questions correctly.</p>
        <p>That's ${percentage}%!</p>
        <p>${message}</p>
    `;
  resultDiv.classList.remove("hidden");

  // Scroll to results
  resultDiv.scrollIntoView({ behavior: "smooth" });
}

// Play all dialogue function
function playFullDialogue() {
  const audioButtons = document.querySelectorAll(".audio-btn");
  const playAllBtn = document.getElementById("play-all-btn");

  playAllBtn.textContent = "⏸️ Playing...";
  playAllBtn.disabled = true;

  let currentIndex = 0;

  function playNext() {
    if (currentIndex < audioButtons.length) {
      const button = audioButtons[currentIndex];
      const text = button.getAttribute("data-text");
      const speaker = button.getAttribute("data-speaker");

      // Highlight current line
      const parentLine = button.closest(
        ".anna-line, .james-line, .teacher-intro"
      );
      if (parentLine) {
        parentLine.style.transform = "scale(1.05)";
        parentLine.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.3)";
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;

      // Set voice based on speaker
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (speaker === "anna" || speaker === "teacher") {
          const femaleVoice = voices.find(
            (v) =>
              v.name.toLowerCase().includes("samantha") ||
              v.name.toLowerCase().includes("susan")
          );
          if (femaleVoice) utterance.voice = femaleVoice;
        } else if (speaker === "james") {
          const maleVoice = voices.find(
            (v) =>
              v.name.toLowerCase().includes("daniel") ||
              v.name.toLowerCase().includes("alex")
          );
          if (maleVoice) utterance.voice = maleVoice;
        }
      }

      utterance.onend = function () {
        // Remove highlight
        if (parentLine) {
          parentLine.style.transform = "";
          parentLine.style.boxShadow = "";
        }

        currentIndex++;
        setTimeout(playNext, 800); // Pause between lines
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Reset button when done
      playAllBtn.textContent = "🎵 Play Full Dialogue";
      playAllBtn.disabled = false;
    }
  }

  playNext();
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Wait for voices to load
  if ("speechSynthesis" in window) {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        console.log("Voices loaded:", voices.length);
      }
    };

    // Load voices
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  // Initialize quiz and speaking practice
  initializeQuiz();
  initializeSpeakingPractice();

  // Add event listeners for audio buttons
  document.querySelectorAll(".audio-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const text = this.getAttribute("data-text");
      const speaker = this.getAttribute("data-speaker");

      // Visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      speakText(text, speaker);
    });
  });

  // Add event listener for submit quiz button
  document.getElementById("submit-quiz").addEventListener("click", submitQuiz);

  // Add event listener for play all button
  document
    .getElementById("play-all-btn")
    .addEventListener("click", playFullDialogue);

  // Add smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Additional helper functions
function resetQuiz() {
  // Reset all radio buttons
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  // Remove all correct/incorrect classes
  document.querySelectorAll(".quiz-question").forEach((question) => {
    question.classList.remove("correct", "incorrect");
  });

  // Hide results
  document.getElementById("quiz-result").classList.add("hidden");
}

// Add reset functionality
function addResetButton() {
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "🔄 Reset Quiz";
  resetBtn.className = "submit-btn";
  resetBtn.style.background = "#718096";
  resetBtn.style.marginLeft = "10px";
  resetBtn.onclick = resetQuiz;

  const submitBtn = document.getElementById("submit-quiz");
  submitBtn.parentNode.insertBefore(resetBtn, submitBtn.nextSibling);
}

// Call addResetButton after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(addResetButton, 100);
});

// Pronunciation practice function
function startPronunciationPractice(questionIndex) {
  const question = speakingQuestions[questionIndex];

  alert(
    `Practice saying your answer to: "${question.question}"\n\nExample: ${question.example}\n\nTip: Use simple present tense and speak clearly!`
  );

  // Optional: Start speech recognition if available
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = function () {
        console.log("Voice recognition started");
      };

      recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        alert(
          `You said: "${transcript}"\n\nGreat job practicing! Keep working on your pronunciation.`
        );
      };

      recognition.onerror = function (event) {
        console.log("Speech recognition error:", event.error);
      };

      // Uncomment the line below if you want to automatically start speech recognition
      // recognition.start();
    } catch (error) {
      console.log("Speech recognition not available:", error);
    }
  }
}

// Vocabulary helper
const vocabularyWords = [
  {
    word: "usually",
    definition: "most of the time; normally",
    example: "I usually wake up at 7 AM.",
  },
  {
    word: "breakfast",
    definition: "the first meal of the day",
    example: "Do you eat breakfast every day?",
  },
  {
    word: "homework",
    definition: "school work that students do at home",
    example: "I do my homework after dinner.",
  },
  {
    word: "routine",
    definition: "things you do regularly in the same order",
    example: "My morning routine includes brushing teeth and eating.",
  },
];

function showVocabularyHelp() {
  let vocabHtml = "<h3>📚 Key Vocabulary</h3>";
  vocabularyWords.forEach((item) => {
    vocabHtml += `
            <div style="margin-bottom: 15px; padding: 10px; background: #f7fafc; border-radius: 5px;">
                <strong>${item.word}</strong>: ${item.definition}<br>
                <em>Example: ${item.example}</em>
                <button onclick="speakText('${item.word}', 'teacher')" style="margin-left: 10px; padding: 3px 8px; font-size: 12px;">🔊</button>
            </div>
        `;
  });

  // Create modal or insert into page
  const vocabDiv = document.createElement("div");
  vocabDiv.innerHTML = vocabHtml;
  vocabDiv.style.cssText = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-width: 500px; max-height: 70vh; overflow-y: auto; z-index: 1000;
    `;

  const overlay = document.createElement("div");
  overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.5); z-index: 999;
    `;

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕ Close";
  closeBtn.style.cssText = `
        position: absolute; top: 10px; right: 15px; 
        background: #f56565; color: white; border: none; 
        padding: 5px 10px; border-radius: 5px; cursor: pointer;
    `;
  closeBtn.onclick = () => {
    document.body.removeChild(overlay);
    document.body.removeChild(vocabDiv);
  };

  overlay.onclick = closeBtn.onclick;

  vocabDiv.appendChild(closeBtn);
  document.body.appendChild(overlay);
  document.body.appendChild(vocabDiv);
}

// Add vocabulary button after page loads
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const vocabBtn = document.createElement("button");
    vocabBtn.textContent = "📚 Vocabulary Help";
    vocabBtn.className = "submit-btn";
    vocabBtn.style.background = "#805ad5";
    vocabBtn.onclick = showVocabularyHelp;

    const grammarSection = document.getElementById("grammar-section");
    grammarSection.appendChild(vocabBtn);
  }, 200);
});
