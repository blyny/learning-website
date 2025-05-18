// DOM elements
const installBtn = document.getElementById('installBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const soundBtn = document.getElementById('soundBtn');
const topicTitle = document.getElementById('topicTitle');
const topicDescription = document.getElementById('topicDescription');
const canvas = document.getElementById('learningCanvas');

// App state
let currentTopicIndex = 0;
let topics = [];

// Install PWA logic
// Install PWA functionality
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show the install button
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'flex';
  }
  
  // Optional: Log analytics event
  console.log('PWA install prompt available');
});

// Handle install button click
document.getElementById('installBtn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  
  // Optional: Log analytics event
  console.log(`User ${outcome} the install prompt`);
  
  // Hide the install button
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'none';
  }
  
  // We've used the prompt, and can't use it again
  deferredPrompt = null;
});

// Track successful installation
window.addEventListener('appinstalled', () => {
  // Hide the install button
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'none';
  }
  
  // Optional: Log analytics event
  console.log('PWA was installed');
  
  // You could redirect to a "Thank you for installing" page
  // window.location.href = '/installed.html';
});

// Load data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    topics = data.topics;
    loadTopic(currentTopicIndex);
  });

// Navigation
function loadTopic(index) {
  const topic = topics[index];
  topicTitle.textContent = topic.title;
  topicDescription.textContent = topic.description;
  
  // Update canvas with new image
  drawCanvas(topic.image, topic.facts);
  
  // Update button states
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === topics.length - 1;
}

prevBtn.addEventListener('click', () => {
  if (currentTopicIndex > 0) {
    currentTopicIndex--;
    loadTopic(currentTopicIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentTopicIndex < topics.length - 1) {
    currentTopicIndex++;
    loadTopic(currentTopicIndex);
  }
});

// Sound functionality
soundBtn.addEventListener('click', () => {
  const topic = topics[currentTopicIndex];
  const audio = new Audio(topic.audio);
  audio.play();
});

// DOM elements
const soundBtns = {
    narration: document.getElementById('narrationBtn'),
    effect: document.getElementById('soundEffectBtn')
  };
  
  // Audio objects
  let currentAudios = {
    narration: null,
    effect: null
  };
  
  function loadTopic(index) {
    const topic = topics[index];
    topicTitle.textContent = topic.title;
    topicDescription.textContent = topic.description;
    
    // This already works with your single image
    drawCanvas(topic.image, topic.facts);
    
    currentAudio = new Audio(topic.audio);
    
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === topics.length - 1;
  }
  
  // Audio button event listeners
  soundBtns.narration.addEventListener('click', () => {
    if (currentAudios.narration) {
      currentAudios.narration.play();
    }
  });
  
  soundBtns.effect.addEventListener('click', () => {
    if (currentAudios.effect) {
      currentAudios.effect.play();
    }
  });

  