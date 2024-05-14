import React from 'react'

const Title = ({text}) => {
  return (
    <div className="text-center text-gray-700 text-4xl p-4 font-bold relative">
     <span className="text-shadow-lg">{text}</span>
  </div>
  )
}

export default Title
