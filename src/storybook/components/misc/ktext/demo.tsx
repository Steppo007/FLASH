import { KText, textTypes } from '@root/src/components/misc/ktext';
import { ExampleWrapper } from '@sbook/utils';

export default function Example() {
  const text = 'The quick brown fox jumps over the lazy dog.';
  return (
    <ExampleWrapper className="flex flex-col gap-2">
      {textTypes.map((textType) => {
        return (
          <KText key={textType} type={textType}>
            {textType + ': ' + text}
          </KText>
        );
      })}
    </ExampleWrapper>
  );
}
