function normalize(str) {
  return str.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

function checkAllAnswers() {
  const questions = document.querySelectorAll(".question");
  let correctCount = 0;
  
  // Reset all results first
  questions.forEach(q => {
    const resultSpan = q.querySelector(".result");
    resultSpan.textContent = "";
    resultSpan.className = "result";
  });

  questions.forEach((q, index) => {
    const qType = q.dataset.type; // "mc" or "sq"
    const correctAnswers = q.dataset.answer
      .split(",")
      .map(a => normalize(a));
    const resultSpan = q.querySelector(".result");
    let userAnswer = "";

    // --- Multiple Choice Logic ---
    if (qType === "mc") {
      const selected = q.querySelector(`input[name=q${index + 1}]:checked`);
      
      if (!selected) {
        resultSpan.textContent = "❌ No option selected";
        resultSpan.classList.add("incorrect");
        return;
      }
      
      userAnswer = normalize(selected.value);
      
      if (correctAnswers.includes(userAnswer)) {
        resultSpan.textContent = "✅ Correct!";
        resultSpan.classList.add("correct");
        correctCount++;
      } else {
        resultSpan.textContent = `❌ Correct answer: ${q.dataset.answer}`;
        resultSpan.classList.add("incorrect");
      }
    }

    // --- Short Answer Logic ---
    else if (qType === "sq") {
      const input = q.querySelector("textarea, input[type='text']");
      
      if (!input || !input.value.trim()) {
        resultSpan.textContent = "❌ No answer provided";
        resultSpan.classList.add("incorrect");
        return;
      }

      const userNormalized = normalize(input.value);
      
      if (correctAnswers.includes(userNormalized)) {
        resultSpan.textContent = "✅ Correct!";
        resultSpan.classList.add("correct");
        correctCount++;
      } else {
        resultSpan.textContent = `❌ Accepted answers: ${correctAnswers.join(", ")}`;
        resultSpan.classList.add("incorrect");
      }
    }
  });

  const scoreDiv = document.getElementById("finalScore");
  scoreDiv.textContent = `You got ${correctCount} / ${questions.length} correct.`;
  scoreDiv.classList.add("show");
  
  // Scroll to score
  scoreDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Optional: Add enter key support for short answer questions
document.addEventListener('DOMContentLoaded', function() {
  const shortAnswerInputs = document.querySelectorAll('.question[data-type="sq"] textarea, .question[data-type="sq"] input[type="text"]');
  
  shortAnswerInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkAllAnswers();
      }
    });
  });
});

// Additional JavaScript for listening quiz features
let playbackSpeed = 1;
const audioElement = document.getElementById('quizAudio');

function playFromBeginning() {
    audioElement.currentTime = 0;
    audioElement.play();
}

function togglePlaybackSpeed() {
    playbackSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 0.75 : 1;
    audioElement.playbackRate = playbackSpeed;
    document.querySelector('.audio-btn:nth-child(2)').innerHTML = 
        `⚡ Speed: ${playbackSpeed}x`;
}

function downloadAudio() {
    // This would typically link to the actual audio file
    alert('Audio download feature would be implemented here.');
}
