import React from 'react'

type DevSkillsProps = {
    skills: string[],
}

const DevSkills = ({skills}: DevSkillsProps) => {
  return (
    <div className="flex flex-col items-center">
            {skills.join(" · ")}
          </div>
  )
}

export default DevSkills