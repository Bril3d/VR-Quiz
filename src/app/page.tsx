"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"

const quizQuestions = [
  {
    question: "Que signifie VR dans Gaming VR ?",
    options: ["Réalité Virtuelle", "Rendu Visuel", "Résolution Vidéo", "Réalisme Vivant"],
    correctAnswer: "Réalité Virtuelle"
  },
  {
    question: "Quelle marque de casque VR n'existe pas parmi les suivantes ?",
    options: ["Oculus", "HTC Vive", "PlayStation VR", "Nintendo VR"],
    correctAnswer: "Nintendo VR"
  },
  {
    question: "Quel est un défi courant dans le jeu en VR ?",
    options: ["Le mal des transports", "Le manque de jeux", "Trop de réalisme", "Une connexion internet lente"],
    correctAnswer: "Le mal des transports"
  },
  {
    question: "Quelle technologie est cruciale pour suivre les mouvements dans les jeux VR ?",
    options: ["GPS", "Bluetooth", "Capteurs de mouvement", "5G"],
    correctAnswer: "Capteurs de mouvement"
  },
  {
    question: "Quel type de jeux est particulièrement adapté à la VR ?",
    options: ["Stratégie au tour par tour", "Jeux de tir à la première personne", "Aventures textuelles", "Plateformes 2D"],
    correctAnswer: "Jeux de tir à la première personne"
  },
  {
    question: "Quelle résolution minimale est généralement recommandée pour chaque œil dans un casque VR ?",
    options: ["800x600", "1280x720", "1920x1080", "2160x1200"],
    correctAnswer: "1920x1080"
  },
  {
    question: "Quel terme désigne la sensation d'être présent dans un environnement virtuel ?",
    options: ["Immersion", "Téléportation", "Réalité augmentée", "Synesthésie"],
    correctAnswer: "Immersion"
  },
  {
    question: "Quelle entreprise a développé le casque VR 'Index' ?",
    options: ["Facebook", "Sony", "Valve", "HTC"],
    correctAnswer: "Valve"
  },
  {
    question: "Quel type de contrôleur est souvent utilisé dans les jeux VR pour simuler les mains ?",
    options: ["Manette traditionnelle", "Clavier", "Contrôleurs de mouvement", "Joystick"],
    correctAnswer: "Contrôleurs de mouvement"
  },
  {
    question: "Quelle technologie permet de suivre la position du casque VR dans l'espace ?",
    options: ["Inside-out tracking", "Outside-in tracking", "GPS tracking", "Gyroscope tracking"],
    correctAnswer: "Inside-out tracking"
  }
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(quizQuestions.length).fill(""))
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelection = (answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizQuestions[index].correctAnswer ? score + 1 : score
    }, 0)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(quizQuestions.length).fill(""))
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader className="bg-gray-700 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-purple-400">Quiz VR Gaming</CardTitle>
          <CardDescription className="text-gray-300">Testez vos connaissances sur le jeu en Réalité Virtuelle !</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          {!showResults ? (
            <>
              <div className="mb-4">
                <Progress value={(currentQuestion + 1) / quizQuestions.length * 100} className="h-2 bg-gray-600" />
              </div>
              <h2 className="text-xl font-semibold mb-4 text-purple-300">
                Question {currentQuestion + 1} sur {quizQuestions.length}
              </h2>
              <p className="mb-4 text-lg">{quizQuestions[currentQuestion].question}</p>
              <RadioGroup
                value={selectedAnswers[currentQuestion]}
                onValueChange={handleAnswerSelection}
                className="space-y-2"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <RadioGroupItem value={option} id={`option-${index}`} className="border-purple-400 text-purple-400" />
                    <Label htmlFor={`option-${index}`} className="text-gray-200 cursor-pointer flex-grow">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Résultats du Quiz</h2>
              <p className="mb-4 text-xl">
                Vous avez obtenu {calculateScore()} sur {quizQuestions.length} !
              </p>
              <hr className="border-gray-600 my-4" />
              <ul className="space-y-4">
                {quizQuestions.map((q, index) => (
                  <li key={index} className={`p-3 rounded-lg ${selectedAnswers[index] === q.correctAnswer ? "bg-green-800" : "bg-red-800"}`}>
                    <p className="font-semibold mb-2">{q.question}</p>
                    <p>Votre réponse : {selectedAnswers[index]}</p>
                    {selectedAnswers[index] !== q.correctAnswer && (
                      <p className="text-green-400">Réponse correcte : {q.correctAnswer}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResults ? (
            <Button 
              onClick={handleNextQuestion} 
              disabled={!selectedAnswers[currentQuestion]}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Terminer le Quiz" : "Question Suivante"}
            </Button>
          ) : (
            <Button 
              onClick={resetQuiz}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Recommencer le Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}