
// Quiz GIC con animaciones visuales y estilo mejorado
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const sections = {
  "Verdadero o Falso": [
    {
      question: "La globalización cultural promueve la desaparición de las lenguas autóctonas.",
      options: ["Verdadero", "Falso"],
      answer: "Verdadero"
    },
    {
      question: "La Primera Globalización comenzó con la Revolución Industrial.",
      options: ["Verdadero", "Falso"],
      answer: "Falso"
    },
    {
      question: "La globalización económica implica intercambio de bienes y servicios.",
      options: ["Verdadero", "Falso"],
      answer: "Verdadero"
    }
  ],
  "Preguntas Trampa": [
    {
      question: "La globalización económica evita que haya desigualdad entre países.",
      options: ["Verdadero", "Falso"],
      answer: "Falso"
    },
    {
      question: "El DPO solo es obligatorio en empresas educativas.",
      options: ["Verdadero", "Falso"],
      answer: "Falso"
    }
  ],
  "Preguntas Comunes": [
    {
      question: "¿Qué es la globalización?",
      options: [
        "Un fenómeno exclusivamente económico",
        "Un proceso político, económico, social y cultural que interconecta países y regiones.",
        "Una política internacional sobre comercio"
      ],
      answer: "Un proceso político, económico, social y cultural que interconecta países y regiones."
    },
    {
      question: "¿Qué evento marcó la Segunda Globalización?",
      options: [
        "La creación de internet",
        "La caída del Muro de Berlín en 1989",
        "La invención del teléfono"
      ],
      answer: "La caída del Muro de Berlín en 1989"
    }
  ]
};

export default function QuizGIC() {
  const [started, setStarted] = useState(false);
  const [section, setSection] = useState(null);

  const handleStart = (selectedSection) => {
    setSection(selectedSection);
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-indigo-100 flex flex-col items-center justify-center p-6">
      {!started ? (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 drop-shadow">📘 Quiz GIC</h1>
          <p className="text-gray-700 text-lg mb-8">Elegí una categoría para comenzar:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(sections).map((key) => (
              <motion.button
                key={key}
                onClick={() => handleStart(key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition border-2 border-indigo-400 hover:bg-indigo-50 text-indigo-700 font-semibold"
              >
                {key}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <QuizSection sectionName={section} questions={sections[section]} onBack={() => setStarted(false)} />
      )}
    </div>
  );
}

function QuizSection({ sectionName, questions, onBack }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const current = questions[index];

  const handleAnswer = (opt) => {
    if (selected) return;
    setSelected(opt);
    const correct = opt === current.answer;
    if (correct) setScore(score + 1);
    setAnswers([...answers, { question: current.question, answer: opt, correct }]);
    setTimeout(() => {
      setSelected(null);
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        setCompleted(true);
      }
    }, 1200);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
    setSelected(null);
  };

  const finalScore = (score / questions.length) * 10;
  const status = finalScore >= 7 ? "🎉 Promocionado" : finalScore >= 4 ? "✅ Aprobado" : "❌ Desaprobado";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index + (completed ? '-done' : '')}
        className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">{sectionName}</h2>
        {!completed ? (
          <div>
            <p className="text-lg font-medium text-gray-800 mb-6">{current.question}</p>
            <div className="grid grid-cols-1 gap-4">
              {current.options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-md font-medium shadow transition
                    ${selected
                      ? opt === current.answer
                        ? 'bg-green-100 border-green-400 text-green-800'
                        : opt === selected
                          ? 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-white text-gray-600'
                      : 'bg-white hover:bg-indigo-50 border-gray-300 text-gray-800'}`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">Pregunta {index + 1} de {questions.length}</p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Resultado final</h3>
            <ul className="space-y-2 mb-6">
              {answers.map((ans, i) => (
                <li key={i} className={ans.correct ? "text-green-600" : "text-red-500"}>
                  {ans.question} → <span className="font-semibold">{ans.answer}</span> ({ans.correct ? "✔" : "✘"})
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold">Puntaje: {finalScore.toFixed(1)} / 10 – {status}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button onClick={reset} className="bg-yellow-400 px-4 py-2 rounded-lg text-white">Reintentar</button>
              <button onClick={onBack} className="bg-gray-500 px-4 py-2 rounded-lg text-white">Volver al inicio</button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
