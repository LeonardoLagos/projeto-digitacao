import { useEffect, useRef, useState } from 'react'
import { DateRange, DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'


interface selectionRange {
  startDate: Date,
  endDate: Date,
  key: string
}

const DateRangePickerComp = () => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), -7),
      key: 'selection'
    } as selectionRange
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className="inline-block relative">
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} até ${format(range[0].endDate, "dd/MM/yyyy")}`}
        readOnly
        className="px-1 py-2 rounded border border-slate-400 bg-gray-600"
        onClick={() => setOpen(open => !open)}
      />

      <div ref={refOne}>
        {open &&
          <DateRange
            onChange={item => setRange([item.selection as selectionRange])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            color='#FFFFFF'
            direction="horizontal"
            className="absolute z-50"
          />
        }
      </div>
    </div>
  )
}

export default DateRangePickerComp