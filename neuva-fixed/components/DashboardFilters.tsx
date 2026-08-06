'use client'
import React, { useState } from 'react'
import { Party, TransactionType } from '@/types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DashboardFiltersProps {
  parties: Party[]
  transactionTypes: TransactionType[]
  selectedPartyId?: number
  selectedDate?: Date
  selectedTransactionTypeId?: number
  onPartyChange: (partyId: number | undefined) => void
  onDateChange: (date: Date | undefined) => void
  onTransactionTypeChange: (transactionTypeId: number | undefined) => void
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  parties,
  transactionTypes,
  selectedPartyId,
  selectedDate,
  selectedTransactionTypeId,
  onPartyChange,
  onDateChange,
  onTransactionTypeChange,
}) => {
  const [partySearchTerm, setPartySearchTerm] = useState('')
  const [typeSearchTerm, setTypeSearchTerm] = useState('')

  const selectedPartyName = selectedPartyId 
    ? parties.find(p => p.id === selectedPartyId)?.name || ''
    : ''

  const selectedTypeName = selectedTransactionTypeId
    ? transactionTypes.find(t => t.id === selectedTransactionTypeId)?.note || ''
    : ''

  const filteredParties = partySearchTerm
    ? parties.filter(party => 
        party.name.toLowerCase().includes(partySearchTerm.toLowerCase())
      )
    : parties

  const filteredTypes = typeSearchTerm
    ? transactionTypes.filter(type => 
        type.note.toLowerCase().includes(typeSearchTerm.toLowerCase())
      )
    : transactionTypes

  const handlePartyChange = (value: string) => {
    setPartySearchTerm(value)
    if (!value) {
      onPartyChange(undefined)
      return
    }
    const party = parties.find(p => p.name === value)
    onPartyChange(party?.id)
  }

  const handleTypeChange = (value: string) => {
    setTypeSearchTerm(value)
    if (!value) {
      onTransactionTypeChange(undefined)
      return
    }
    const type = transactionTypes.find(t => t.note === value)
    onTransactionTypeChange(type?.id)
  }

  const handleClearFilters = () => {
    onPartyChange(undefined)
    onDateChange(undefined)
    onTransactionTypeChange(undefined)
    setPartySearchTerm('')
    setTypeSearchTerm('')
  }

  return (
    <div className="flex flex-wrap gap-4 items-end">
      {/* Party Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="form-label">Filter by Party</label>
        <input 
          className="form-input"
          type="text"
          value={selectedPartyName || partySearchTerm}
          onChange={(e) => handlePartyChange(e.target.value)}
          list="party-list"
          placeholder="Type to search..."
        />
        <datalist id="party-list">
          <option value="">All Parties</option>
          {filteredParties.map((party) => (
            <option key={party.id} value={party.name}>
              {party.name}
            </option>
          ))}
        </datalist>
      </div>

      {/* Transaction Type Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="form-label">Filter by Transaction Type</label>
        <input 
          className="form-input"
          type="text"
          value={selectedTypeName || typeSearchTerm}
          onChange={(e) => handleTypeChange(e.target.value)}
          list="type-list"
          placeholder="Type to search..."
        />
        <datalist id="type-list">
          <option value="">All Types</option>
          {filteredTypes.map((type) => (
            <option key={type.id} value={type.note}>
              {type.note}
            </option>
          ))}
        </datalist>
      </div>

      {/* Date Filter */}
      <div className="flex-1 min-w-[200px]">
        <label className="form-label">Till Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="dd/MM/yyyy"
          className="form-input"
          placeholderText="Select date"
          isClearable
        />
      </div>

      {/* Clear Filters */}
      {(selectedPartyId || selectedDate || selectedTransactionTypeId) && (
        <button
          onClick={handleClearFilters}
          className="btn btn-outline btn-sm"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}