import React from 'react'
import windowWrapper from '#hoc/windowWrapper.jsx'
import { Check } from 'lucide-react'
import { techStack } from '#constants'

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@Anshuman % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}
                  {index < items.length - 1 ? ", " : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const TerminalWindow = windowWrapper(Terminal, 'terminal')

export default TerminalWindow