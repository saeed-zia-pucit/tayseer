import { AnimatePresence, motion } from 'framer-motion'
import { Chip, OptionCard, SectionLabel } from '@/components/finder/OptionCard'
import { Button } from '@/components/ui/Button'
import {
  audienceOptions,
  capabilityOptions,
  countryOptions,
  finderStepMeta,
  productTypeOptions,
  regionScopeOptions,
} from '@/data/finderOptions'
import type { FinderAnswers } from '@/types'
import { TOTAL_FINDER_STEPS } from '@/lib/constants'

interface QuestionPanelProps {
  step: number
  answers: FinderAnswers
  onUpdate: (partial: Partial<FinderAnswers>) => void
  onNext: () => void
  onBack: () => void
  onSeeResults: () => void
  canProceed: boolean
}

export function QuestionPanel({
  step,
  answers,
  onUpdate,
  onNext,
  onBack,
  onSeeResults,
  canProceed,
}: QuestionPanelProps) {
  const meta = finderStepMeta[step - 1]
  const showCountries =
    answers.regionScope === 'single' || answers.regionScope === 'multiple'

  return (
    <div className="flex min-h-full flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lagoon">
            Product Finder
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {meta.title}
          </h2>

          <div className="mt-8">
            {step === 1 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {productTypeOptions.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    hint={opt.hint}
                    selected={answers.productType === opt.value}
                    onClick={() => onUpdate({ productType: opt.value })}
                  />
                ))}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {audienceOptions.map((opt) => (
                  <OptionCard
                    key={opt.value}
                    label={opt.label}
                    selected={answers.audience === opt.value}
                    onClick={() => onUpdate({ audience: opt.value })}
                  />
                ))}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-3">
                  {regionScopeOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      selected={answers.regionScope === opt.value}
                      onClick={() =>
                        onUpdate({
                          regionScope: opt.value,
                          countries:
                            opt.value === 'global' ? [] : answers.countries,
                        })
                      }
                    />
                  ))}
                </div>

                <AnimatePresence>
                  {showCountries ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <SectionLabel>
                        {answers.regionScope === 'single'
                          ? 'Select country'
                          : 'Select countries'}
                      </SectionLabel>
                      <div className="flex flex-wrap gap-2">
                        {countryOptions.map((opt) => {
                          const selected = answers.countries.includes(opt.value)
                          return (
                            <Chip
                              key={opt.value}
                              label={opt.label}
                              selected={selected}
                              onClick={() => {
                                if (answers.regionScope === 'single') {
                                  onUpdate({ countries: [opt.value] })
                                  return
                                }
                                onUpdate({
                                  countries: selected
                                    ? answers.countries.filter(
                                        (c) => c !== opt.value,
                                      )
                                    : [...answers.countries, opt.value],
                                })
                              }}
                            />
                          )
                        })}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {capabilityOptions.map((opt) => {
                  const selected = answers.capabilities.includes(opt.value)
                  return (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      multi
                      selected={selected}
                      onClick={() =>
                        onUpdate({
                          capabilities: selected
                            ? answers.capabilities.filter((c) => c !== opt.value)
                            : [...answers.capabilities, opt.value],
                        })
                      }
                    />
                  )
                })}
              </div>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line/80 pt-6">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={step === 1}
          className="disabled:opacity-30"
        >
          Back
        </Button>

        {step < TOTAL_FINDER_STEPS ? (
          <Button onClick={onNext} disabled={!canProceed}>
            Continue
          </Button>
        ) : (
          <Button onClick={onSeeResults} disabled={!canProceed}>
            See recommended solution
          </Button>
        )}
      </div>
    </div>
  )
}

export function canProceedStep(step: number, answers: FinderAnswers): boolean {
  if (step === 1) return Boolean(answers.productType)
  if (step === 2) return Boolean(answers.audience)
  if (step === 3) {
    if (!answers.regionScope) return false
    if (answers.regionScope === 'global') return true
    return answers.countries.length > 0
  }
  if (step === 4) return answers.capabilities.length > 0
  return false
}
