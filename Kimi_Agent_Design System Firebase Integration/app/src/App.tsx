import Hero from './sections/Hero'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Navigation from './sections/Navigation'
import AdminPanel from './components/AdminPanel'
import PasswordModal from './components/PasswordModal'
import { useAdminPanel } from './hooks/useAdminPanel'

function App() {
  const {
    isAdminOpen,
    showPasswordModal,
    password,
    error,
    setPassword,
    handlePasswordSubmit,
    closeAdmin,
    logout,
    closePasswordModal,
  } = useAdminPanel()

  return (
    <div className="min-h-screen bg-neo-cream overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Admin Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        password={password}
        error={error}
        onPasswordChange={setPassword}
        onSubmit={handlePasswordSubmit}
        onClose={closePasswordModal}
      />

      {/* Admin Panel */}
      {isAdminOpen && (
        <AdminPanel onClose={closeAdmin} onLogout={logout} />
      )}
    </div>
  )
}

export default App
