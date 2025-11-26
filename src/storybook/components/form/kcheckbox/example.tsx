import { KCheckbox } from '@complib/form/kcheckbox';
import { KInputContainer } from '@root/src/components/form/kinputcontainer';
import KHelperText from '@root/src/components/misc/khelpertext';
import { ExampleWrapper } from '@sbook/utils';
import { useState } from 'react';

interface Language {
  label: string;
  key: string;
  checked: boolean;
}

const languages: Language[] = [
  { label: 'English', key: 'en', checked: true },
  { label: 'German', key: 'de', checked: false },
  { label: 'Spanish', key: 'es', checked: false },
  { label: 'French', key: 'fr', checked: true },
];

export function Example() {
  const [compLanguages, setCompLanguages] = useState(languages);

  /**
   * Create new array with updated checkbox group state.
   * New array object reference needed for React state update.
   */
  const changeValue = (key: string, checked: boolean) => {
    const updatedLanguages = compLanguages.map((language) =>
      language.key === key ? { ...language, checked } : language
    );
    setCompLanguages(updatedLanguages);
  };

  const allSelected = compLanguages.every((x) => x.checked);
  const helperText = allSelected
    ? 'Cannot choose all languages'
    : 'Choose your languages';

  return (
    <ExampleWrapper>
      <KInputContainer>
        <div className="flex gap-12">
          {compLanguages.map((language) => {
            return (
              <KCheckbox
                key={language.key}
                name="language-checkbox"
                inputId={'language-checkbox-' + language.key}
                value={language.key}
                label={language.label}
                checked={language.checked}
                onClick={() => changeValue(language.key, !language.checked)}
                invalid={allSelected}
                size="default"
              />
            );
          })}
        </div>
        <KHelperText className="mt-2">{helperText}</KHelperText>
      </KInputContainer>
    </ExampleWrapper>
  );
}
