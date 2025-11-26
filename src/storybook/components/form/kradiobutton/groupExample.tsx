import { KRadioButton } from '@complib/form/kradiobutton';
import { KInputContainer } from '@root/src/components/form/kinputcontainer';
import KHelperText from '@root/src/components/misc/khelpertext';
import { ExampleWrapper } from '@sbook/utils';
import { useState } from 'react';

interface Language {
  label: string;
  key: string;
}

const languages: Language[] = [
  { label: 'English', key: 'en' },
  { label: 'German', key: 'de' },
  { label: 'Spanish', key: 'es' },
  { label: 'French', key: 'fr' },
];

export function LanguageRadioGroup() {
  const [value, setValue] = useState<string>('');

  const invalid = value === 'fr';
  const helperText = invalid ? 'Invalid selection' : 'Make a selection';

  return (
    <ExampleWrapper>
      <KInputContainer>
        <div className="flex gap-12">
          {languages.map((language) => {
            const name = 'language';
            return (
              <KRadioButton
                key={language.key}
                name={name}
                value={language.key}
                checked={value === language.key}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                id={name + '-' + language.key}
                invalid={invalid}
                label={language.label}
              />
            );
          })}
        </div>
        <KHelperText className="mt-2">{helperText}</KHelperText>
      </KInputContainer>
    </ExampleWrapper>
  );
}
