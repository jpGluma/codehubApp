
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';

const GREEN = '#079875';
const DARK = '#202126';
const MUTED = '#777982';
const BG = '#F8F9F8';

const LANGUAGES = [
  { id: 'python', name: 'Python', icon: '🐍', color: '#E7F4FF', description: 'Learn Python programming.' },
  { id: 'java', name: 'Java', icon: '☕', color: '#FFF0E6', description: 'Learn object-oriented programming.' },
  { id: 'cpp', name: 'C++', icon: '⚙️', color: '#EAEAFF', description: 'Learn C++ fundamentals.' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨', color: '#FFF9D9', description: 'Learn web development.' },
  { id: 'php', name: 'PHP', icon: '🐘', color: '#F0EBFF', description: 'Learn server-side programming.' },
];

const LESSONS = {
  python: [
    {
      id: '1',
      title: 'Introduction to Python',
      level: 'Beginner',
      explanation: 'Python is a popular programming language known for its simple and readable syntax. It is used in web development, automation, data science, and artificial intelligence.',
      example: 'print("Hello, World!")',
      output: 'Hello, World!',
    },
    {
      id: '2',
      title: 'Python Variables',
      level: 'Beginner',
      explanation: 'Variables are used to store information. You can assign a value to a variable using the equals sign.',
      example: 'name = "Alex"\nage = 20\nprint(name)\nprint(age)',
      output: 'Alex\n20',
    },
    {
      id: '3',
      title: 'Python Data Types',
      level: 'Beginner',
      explanation: 'Python has different data types, including strings, integers, floats, and booleans.',
      example: 'name = "Alex"\nage = 20\nprice = 10.5\nis_student = True',
      output: 'String, Integer, Float, Boolean',
    },
  ],
  java: [
    {
      id: '1',
      title: 'Introduction to Java',
      level: 'Beginner',
      explanation: 'Java is a general-purpose, object-oriented programming language.',
      example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
      output: 'Hello, World!',
    },
    {
      id: '2',
      title: 'Java Variables',
      level: 'Beginner',
      explanation: 'Variables store data values. Java requires you to declare the data type.',
      example: 'String name = "Alex";\nint age = 20;\nSystem.out.println(name);',
      output: 'Alex',
    },
  ],
  cpp: [
    {
      id: '1',
      title: 'Introduction to C++',
      level: 'Beginner',
      explanation: 'C++ is a general-purpose programming language used for software, games, and system development.',
      example: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}',
      output: 'Hello, World!',
    },
  ],
  javascript: [
    {
      id: '1',
      title: 'Introduction to JavaScript',
      level: 'Beginner',
      explanation: 'JavaScript is a programming language used to make websites interactive.',
      example: 'console.log("Hello, World!");',
      output: 'Hello, World!',
    },
  ],
  php: [
    {
      id: '1',
      title: 'Introduction to PHP',
      level: 'Beginner',
      explanation: 'PHP is a server-side programming language commonly used for web development.',
      example: '<?php\necho "Hello, World!";\n?>',
      output: 'Hello, World!',
    },
  ],
};

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [role, setRole] = useState('Student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completed, setCompleted] = useState({});
  const [showRegister, setShowRegister] = useState(false);

  const lessons = selectedLanguage
    ? LESSONS[selectedLanguage.id] || []
    : [];

  const completedCount = selectedLanguage
    ? lessons.filter(l => completed[selectedLanguage.id + ':' + l.id]).length
    : 0;

  const progress = lessons.length
    ? Math.round((completedCount / lessons.length) * 100)
    : 0;

  function createAccount() {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Weak password', 'Password must contain at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Your passwords do not match.');
      return;
    }

    if (!agreed) {
      Alert.alert('Agreement required', 'Please accept the agreement.');
      return;
    }

    setScreen(role === 'Student' ? 'home' : 'teacher');
  }

  function markCompleted() {
    const key = selectedLanguage.id + ':' + selectedLesson.id;
    setCompleted(prev => ({ ...prev, [key]: true }));
    Alert.alert('Lesson completed!', 'Great job! Your learning progress has been updated.');
    setScreen('lessons');
  }

  function Header({ back, title = 'CodeLearn Hub' }) {
    return (
      <View style={styles.header}>
        {back ? (
          <TouchableOpacity onPress={back} style={styles.backButton}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>
        ) : null}
        <View style={styles.logo}>
          <Text style={styles.logoText}>{'</>'}</Text>
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    );
  }

  // WELCOME SCREEN
  if (screen === 'welcome') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header />

        <ScrollView contentContainerStyle={styles.welcomeContent}>
          <Text style={styles.eyebrow}>YOUR LEARNING WORKSPACE</Text>
          <Text style={styles.heroTitle}>
            Build confidence,{' \n'}one line at a time.
          </Text>
          <Text style={styles.subtitle}>
            Choose how you'll use CodeLearn Hub today.
            You can change your role by signing out.
          </Text>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => {
              setRole('Student');
              setScreen('register');
            }}
          >
            <View>
              <Text style={styles.cardTitle}>I'm a Student</Text>
              <Text style={styles.cardDescription}>
                Learn through guided lessons, examples, and progress.
              </Text>
            </View>
            <View style={styles.roleIcon}>
              <Text style={styles.roleEmoji}>🎓</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => {
              setRole('Teacher');
              setScreen('register');
            }}
          >
            <View>
              <Text style={styles.cardTitle}>I'm a Teacher</Text>
              <Text style={styles.cardDescription}>
                Guide learners and shape the next programming lesson.
              </Text>
            </View>
            <View style={styles.roleIcon}>
              <Text style={styles.roleEmoji}>▤</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => setScreen('admin')}
          >
            <Text style={styles.adminText}>♢  Administrator access</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // REGISTRATION SCREEN
  if (screen === 'register') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header back={() => setScreen('welcome')} />

        <ScrollView contentContainerStyle={styles.registerContent}>
          <Text style={styles.eyebrow}>CREATE YOUR WORKSPACE</Text>
          <Text style={styles.heroTitle}>Start learning by doing.</Text>
          <Text style={styles.subtitle}>
            Set up your profile and choose the path that fits you best.
          </Text>

          <View style={styles.roleSelector}>
            {['Student', 'Teacher'].map(item => (
              <TouchableOpacity
                key={item}
                style={[styles.roleTab, role === item && styles.activeTab]}
                onPress={() => setRole(item)}
              >
                <Text style={[styles.tabText, role === item && styles.activeTabText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="♙  Your name"
            placeholderTextColor="#858585"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="✉  you@example.com"
            placeholderTextColor="#858585"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="♙  At least 8 characters"
              placeholderTextColor="#858585"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eye}>◉</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="♡  Repeat your password"
              placeholderTextColor="#858585"
              secureTextEntry={!showPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eye}>◉</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.agreement}
            onPress={() => setAgreed(!agreed)}
          >
            <View style={[styles.checkbox, agreed && styles.checkedBox]}>
              {agreed && <Text style={styles.checkText}>✓</Text>}
            </View>
            <Text style={styles.agreementText}>
              I agree to use this learning workspace responsibly.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={createAccount}>
            <Text style={styles.primaryButtonText}>Create account  →</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setScreen('welcome')}>
            <Text style={styles.footerText}>Back to welcome screen</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STUDENT DASHBOARD
  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>STUDENT WORKSPACE</Text>
          <Text style={styles.heroTitle}>Hello, {name || 'Learner'}! 👋</Text>
          <Text style={styles.subtitle}>
            Choose a programming language and start learning today.
          </Text>

          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Your learning journey</Text>
            <Text style={styles.progressNumber}>
              {Object.values(completed).filter(Boolean).length} lessons completed
            </Text>
            <Text style={styles.cardDescription}>
              Keep practicing to improve your programming skills.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Explore Languages</Text>

          {LANGUAGES.map(lang => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageCard}
              onPress={() => {
                setSelectedLanguage(lang);
                setScreen('lessons');
              }}
            >
              <View style={[styles.languageIcon, { backgroundColor: lang.color }]}>
                <Text style={styles.languageEmoji}>{lang.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{lang.name}</Text>
                <Text style={styles.cardDescription}>{lang.description}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutButton} onPress={() => setScreen('welcome')}>
            <Text style={styles.logoutText}>Sign out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // LESSON LIST
  if (screen === 'lessons') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header back={() => setScreen('home')} />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>PROGRAMMING COURSE</Text>
          <Text style={styles.heroTitle}>{selectedLanguage?.name}</Text>
          <Text style={styles.subtitle}>
            Select a lesson and learn step by step.
          </Text>

          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Your progress</Text>
            <Text style={styles.progressNumber}>{progress}% completed</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.cardDescription}>
              {completedCount} of {lessons.length} lessons completed
            </Text>
          </View>

          {lessons.map((lesson, index) => {
            const isDone = !!completed[selectedLanguage.id + ':' + lesson.id];
            return (
              <TouchableOpacity
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => {
                  setSelectedLesson(lesson);
                  setScreen('lesson');
                }}
              >
                <View style={styles.lessonNumber}>
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{lesson.title}</Text>
                  <Text style={styles.cardDescription}>{lesson.level}</Text>
                </View>
                <Text style={{ color: GREEN, fontSize: 21 }}>
                  {isDone ? '✓' : '›'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // LESSON DETAILS
  if (screen === 'lesson') {
    const isDone = !!completed[selectedLanguage.id + ':' + selectedLesson.id];

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header back={() => setScreen('lessons')} />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.eyebrow}>{selectedLanguage.name.toUpperCase()} LESSON</Text>
          <Text style={styles.heroTitle}>{selectedLesson.title}</Text>
          <Text style={styles.subtitle}>{selectedLesson.level} level</Text>

          <View style={styles.lessonDetailCard}>
            <Text style={styles.sectionTitle}>📖 Explanation</Text>
            <Text style={styles.bodyText}>{selectedLesson.explanation}</Text>
          </View>

          <View style={styles.lessonDetailCard}>
            <Text style={styles.sectionTitle}>💻 Code Example</Text>
            <View style={styles.codeBox}>
              <Text style={styles.codeText}>{selectedLesson.example}</Text>
            </View>
          </View>

          <View style={styles.lessonDetailCard}>
            <Text style={styles.sectionTitle}>▶ Expected Output</Text>
            <View style={styles.outputBox}>
              <Text style={styles.outputText}>{selectedLesson.output}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, isDone && styles.doneButton]}
            onPress={markCompleted}
            disabled={isDone}
          >
            <Text style={styles.primaryButtonText}>
              {isDone ? '✓ Lesson Completed' : 'Mark as Completed  →'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // TEACHER SCREEN
  if (screen === 'teacher') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header back={() => setScreen('welcome')} />
        <View style={styles.content}>
          <Text style={styles.eyebrow}>TEACHER WORKSPACE</Text>
          <Text style={styles.heroTitle}>Welcome, {name || 'Teacher'}!</Text>
          <Text style={styles.subtitle}>
            Your teaching workspace is ready.
          </Text>
          <View style={styles.progressCard}>
            <Text style={styles.cardTitle}>Teaching Dashboard</Text>
            <Text style={styles.cardDescription}>
              You can use this workspace to plan programming lessons and guide students.
            </Text>
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('welcome')}>
            <Text style={styles.primaryButtonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ADMIN SCREEN
  if (screen === 'admin') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Header back={() => setScreen('welcome')} />
        <View style={styles.content}>
          <Text style={styles.eyebrow}>ADMINISTRATOR</Text>
          <Text style={styles.heroTitle}>Administrator access</Text>
          <Text style={styles.subtitle}>
            This is a demonstration screen. Connect an authentication system
            to secure administrator accounts.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('welcome')}>
            <Text style={styles.primaryButtonText}>Back to welcome</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 11,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: DARK,
  },
  backButton: {
    width: 25,
    marginRight: 8,
  },
  backText: {
    fontSize: 32,
    color: DARK,
  },
  welcomeContent: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 40,
  },
  registerContent: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 40,
  },
  eyebrow: {
    color: '#328C76',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '800',
    color: DARK,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 23,
    marginBottom: 24,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    borderRadius: 21,
    padding: 19,
    minHeight: 112,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '750',
    color: DARK,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 19,
    maxWidth: 230,
  },
  roleIcon: {
    height: 57,
    width: 57,
    borderRadius: 17,
    backgroundColor: '#DDF9ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleEmoji: {
    fontSize: 27,
    color: GREEN,
  },
  adminButton: {
    alignSelf: 'center',
    marginTop: 23,
    padding: 12,
  },
  adminText: {
    color: '#167A64',
    fontWeight: '700',
    fontSize: 14,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 29,
  },
  roleTab: {
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  tabText: {
    color: DARK,
    fontSize: 13,
    fontWeight: '700',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    color: DARK,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 15,
    color: DARK,
  },
  passwordContainer: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: DARK,
  },
  eye: {
    fontSize: 20,
    color: MUTED,
    paddingHorizontal: 4,
  },
  agreement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 27,
    marginBottom: 29,
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  agreementText: {
    color: MUTED,
    fontSize: 12,
    flex: 1,
  },
  primaryButton: {
    height: 55,
    borderRadius: 15,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  footerText: {
    textAlign: 'center',
    color: GREEN,
    marginTop: 20,
    fontWeight: '600',
  },
  progressCard: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 19,
    marginBottom: 25,
  },
  progressNumber: {
    color: GREEN,
    fontWeight: '800',
    fontSize: 23,
    marginVertical: 9,
  },
  sectionTitle: {
    fontSize: 18,
    color: DARK,
    fontWeight: '800',
    marginBottom: 13,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 13,
    gap: 14,
  },
  languageIcon: {
    width: 53,
    height: 53,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageEmoji: {
    fontSize: 25,
  },
  arrow: {
    fontSize: 28,
    color: GREEN,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: DARK,
    marginBottom: 14,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#DDF9ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonNumberText: {
    color: GREEN,
    fontWeight: '800',
    fontSize: 17,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E8EFEC',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: GREEN,
    borderRadius: 10,
  },
  lessonDetailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 19,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 17,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 25,
    color: '#565B62',
  },
  codeBox: {
    backgroundColor: '#20242D',
    padding: 16,
    borderRadius: 12,
  },
  codeText: {
    color: '#B8F3D5',
    fontSize: 13,
    lineHeight: 23,
    fontFamily: 'monospace',
  },
  outputBox: {
    backgroundColor: '#F0F6F2',
    borderRadius: 10,
    padding: 15,
  },
  outputText: {
    color: '#287B60',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: '#5C9C86',
  },
  logoutButton: {
    alignItems: 'center',
    padding: 18,
    marginTop: 10,
  },
  logoutText: {
    color: '#B33A3A',
    fontWeight: '700',
  },
});
