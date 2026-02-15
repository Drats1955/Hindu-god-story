import React, { useState } from 'react';
import './App.css';
import GodSelector from './components/GodSelector';
import UserForm from './components/UserForm';
import StoryDisplay from './components/StoryDisplay';

interface FormData {
  userName: string;
  friendName: string;
  includeMother: boolean;
  includeFather: boolean;
  selectedGods: string[];
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'gods' | 'form' | 'story'>('gods');
  const [selectedGods, setSelectedGods] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    friendName: '',
    includeMother: false,
    includeFather: false,
    selectedGods: [],
  });
  const [generatedStory, setGeneratedStory] = useState<string>('');

  const handleGodSelection = (gods: string[]) => {
    setSelectedGods(gods);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    const story = generateStory(data);
    setGeneratedStory(story);
    setCurrentStep('story');
  };

  const generateStory = (data: FormData): string => {
    const { userName, friendName, includeMother, includeFather, selectedGods } = data;
    
    const parents = [];
    if (includeMother) parents.push('Mother');
    if (includeFather) parents.push('Father');
    const parentStr = parents.length > 0 ? ` along with ${parents.join(' and ')}` : '';

    const story = `
    <div class="story-container">
      <h2>The Epic of ${userName}</h2>
      
      <div class="story-page page-1">
        <h3>Page 1: The Calling</h3>
        <p>
          In the sacred lands of Bharat, there lived a brave soul named <strong>${userName}</strong>, whose destiny was intertwined with the divine. 
          One fateful day, as ${userName} meditated in the temple gardens${parentStr}, a luminous vision appeared.
        </p>
        <p>
          The mighty gods ${selectedGods.join(', ')} descended from the heavens, their forms radiating cosmic energy. 
          They bestowed upon ${userName} a sacred quest: to restore balance to the world and protect the innocent.
        </p>
        <p>
          ${friendName}, ${userName}'s loyal companion, stood beside them with unwavering support. Together, they knew they could face any challenge.
          The gods blessed them with divine knowledge and courage.
        </p>
        <p>
          As the celestial light faded, ${userName} understood their true purpose. The adventure was about to begin.
        </p>
      </div>

      <div class="story-page page-2">
        <h3>Page 2: The Hero's Journey</h3>
        <p>
          Armed with the blessings of the gods, ${userName} and ${friendName} embarked on their sacred mission${parentStr ? ' with ' + parentStr.replace(/\s+along with\s+/, '') : ''}.
          They traversed treacherous mountains, crossed mystical rivers, and faced demons of great power.
        </p>
        <p>
          Throughout their journey, ${userName} invoked the powers granted by the divine trinity:
          ${selectedGods.map((god, index) => `
            <br/>• <strong>${god}</strong> - bestowed the wisdom of dharma and righteousness
          `).join('')}
        </p>
        <p>
          In the final battle, as darkness threatened to consume the world, ${userName} stood tall, 
          channeling the divine energy of all the gods. With ${friendName}'s support and the spiritual 
          strength from their ${parents.length > 0 ? 'family' : 'inner being'}, they defeated the forces of chaos.
        </p>
        <p>
          The gods appeared once more, praising ${userName} as the true hero of the age. 
          ${userName}'s name would be remembered in legends, sung by bards for generations to come.
          The world was saved, and a new age of peace and prosperity began.
        </p>
        <p style="text-align: center; margin-top: 30px; font-style: italic;">
          <strong>ॐ The End ॐ</strong>
        </p>
      </div>
    </div>
    `;

    return story;
  };

  const handleReset = () => {
    setCurrentStep('gods');
    setSelectedGods([]);
    setFormData({
      userName: '',
      friendName: '',
      includeMother: false,
      includeFather: false,
      selectedGods: [],
    });
    setGeneratedStory('');
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🙏 Hindu God Story Generator 🙏</h1>
        <p>Create an epic tale featuring you as the hero</p>
      </header>

      <main className="app-main">
        {currentStep === 'gods' && <GodSelector onSelect={handleGodSelection} />}
        {currentStep === 'form' && <UserForm selectedGods={selectedGods} onSubmit={handleFormSubmit} />}
        {currentStep === 'story' && <StoryDisplay story={generatedStory} onReset={handleReset} />}
      </main>
    </div>
  );
};

export default App;