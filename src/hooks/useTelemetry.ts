import { useRef, useCallback, useEffect } from 'react'
import { telemetryClient } from '@/api/telemetry'

export function useTelemetry(calculatorSlug: string) {
  const fieldFocusTime = useRef<Record<string,number>>({})
  const fieldChangeCounts = useRef<Record<string,number>>({})
  const outputViewStart = useRef<number|null>(null)
  const hasEmittedOpen = useRef(false)

  useEffect(() => {
    if (!hasEmittedOpen.current) {
      hasEmittedOpen.current = true
      telemetryClient.emit({ event_type: 'calculator_opened', calculator_slug: calculatorSlug })
    }
    return () => {
      if (outputViewStart.current) {
        telemetryClient.emit({
          event_type: 'output_viewed', calculator_slug: calculatorSlug,
          output_view_duration_ms: Date.now() - outputViewStart.current,
        })
        outputViewStart.current = null
      }
    }
  }, [calculatorSlug])

  const onFieldFocus = useCallback((fn: string) => { fieldFocusTime.current[fn] = Date.now() }, [])
  const onFieldBlur  = useCallback((fn: string) => { delete fieldFocusTime.current[fn] }, [])

  const onFieldChange = useCallback((fieldName: string, value: number|string) => {
    const t = fieldFocusTime.current[fieldName]
    fieldChangeCounts.current[fieldName] = (fieldChangeCounts.current[fieldName]||0)+1
    telemetryClient.emit({
      event_type: 'field_changed', calculator_slug: calculatorSlug,
      field_name: fieldName,
      field_value: typeof value==='number' ? value : parseFloat(value)||undefined,
      time_on_field_ms: t ? Date.now()-t : undefined,
      change_count_in_session: fieldChangeCounts.current[fieldName],
    })
  }, [calculatorSlug])

  const onCalculationRun = useCallback((
    inputs: Record<string,number|string>, output: Record<string,unknown>
  ) => {
    outputViewStart.current = Date.now()
    telemetryClient.emit({
      event_type: 'calculation_run', calculator_slug: calculatorSlug,
      input_snapshot: inputs as Record<string,number>, output_snapshot: output,
    })
  }, [calculatorSlug])

  return { onFieldFocus, onFieldBlur, onFieldChange, onCalculationRun }
}
