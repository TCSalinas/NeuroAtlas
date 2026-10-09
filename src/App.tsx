import React from 'react';
import { useNeuroStore } from './store/useNeuroStore';
import { Header } from './components/layout/Header';
import { CourseNavigation } from './components/study/CourseNavigation';
import { StructureDrawer } from './components/study/StructureDrawer';
import { BrainCanvas } from './components/brain3d/BrainCanvas';
import { BrainControls } from './components/brain3d/BrainControls';
import { VascularTerritoriesView } from './components/study/VascularTerritoriesView';
import { CorticalLayersView } from './components/study/CorticalLayersView';
import { DemenciasMatrixView } from './components/study/DemenciasMatrixView';
import { QuizView } from './components/study/QuizView';
import { AccessibleAtlasView } from './components/study/AccessibleAtlasView';
import { OmniboxSearch } from './components/study/OmniboxSearch';

export const App: React.FC = () => {
  const { activeView } = useNeuroStore();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      {/* Top Application Bar */}
      <Header />

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left: Academic Course Navigation & Structure List */}
        <CourseNavigation />

        {/* Center: Dynamic View Area */}
        <section className="flex-1 h-full relative overflow-hidden flex flex-col">
          {activeView === 'atlas3d' && (
            <div className="w-full h-full relative">
              <BrainControls />
              <BrainCanvas />
            </div>
          )}

          {activeView === 'vascular' && <VascularTerritoriesView />}
          {activeView === 'citoarquitectura' && <CorticalLayersView />}
          {activeView === 'demencias' && <DemenciasMatrixView />}
          {activeView === 'quiz' && <QuizView />}
          {activeView === 'atlas2d' && <AccessibleAtlasView />}
        </section>

        {/* Right: Structure Study Drawer (Active in atlas modes or when a structure is selected) */}
        {(activeView === 'atlas3d' || activeView === 'atlas2d') && (
          <StructureDrawer />
        )}
      </main>

      {/* Global Omnibox Search Modal (⌘K) */}
      <OmniboxSearch />
    </div>
  );
};

export default App;
