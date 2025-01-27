import { CopyButton } from '@/components/CopyButton';
import { Tabs, TabItem } from '@aws-amplify/ui-react';

type WebFramework = 'react' | 'vue' | 'angular';
type PackageManager = 'npm' | 'yarn';

interface TerminalCommandProps {
  framework?: WebFramework;
  packageManager?: PackageManager;
  command?: string;
}

const frameworkInstallScript = (
  framework: WebFramework,
  packageManager: PackageManager
) =>
  `${
    packageManager === 'npm' ? 'npm i' : 'yarn add'
  } @aws-amplify/ui-${framework} aws-amplify`;

export const TerminalCommand = ({
  framework,
  packageManager,
  command,
}: TerminalCommandProps) => {
  const terminalCommand = command
    ? command
    : frameworkInstallScript(framework, packageManager);

  return (
    <code className="install-code__container">
      <p className="install-code__content">{terminalCommand}</p>
      <CopyButton
        className="install-code__button"
        copyText={terminalCommand}
        variation="link"
      />
    </code>
  );
};

interface InstallScriptsProps {
  framework: WebFramework;
}

export const InstallScripts = ({ framework }: InstallScriptsProps) => {
  return (
    <Tabs maxWidth="42rem">
      <TabItem title="npm">
        <TerminalCommand framework={framework} packageManager="npm" />
      </TabItem>
      <TabItem title="yarn">
        <TerminalCommand framework={framework} packageManager="yarn" />
      </TabItem>
    </Tabs>
  );
};
