import chalk from 'chalk';
import logo from './util/output/logo';
import { getPkgName } from './util/pkg-name';

export const help = () => `
  ${chalk.bold(`${logo} ${getPkgName()}`)} [options] <command | path>

  ${chalk.dim('For deploy command help, run `vercel deploy --help`')}

  ${chalk.dim('Commands:')}

    ${chalk.dim('Basic')}

      deploy               [path]      Performs a deployment ${chalk.bold(
        '(default)'
      )}
      dev                              Start a local development server
      env                              Manages the Environment Variables for your current Project
      git                              Manage Git provider repository for your current Project
      help                 [cmd]       Displays complete help for [cmd]
      init                 [example]   Initialize an example project
      inspect              [id]        Displays information related to a deployment
      link                 [path]      Link local directory to a Vercel Project
      ls | list            [app]       Lists deployments
      login                [email]     Logs into your account or creates a new one
      logout                           Logs out of your account
      pull                 [path]      Pull your Project Settings from the cloud
      rollback             [url|id]    Quickly revert back to a previous deployment
      switch               [scope]     Switches between teams and your personal account

    ${chalk.dim('Advanced')}

      alias                [cmd]       Manages your domain aliases
      bisect                           Use binary search to find the deployment that introduced a bug
      certs                [cmd]       Manages your SSL certificates
      dns                  [name]      Manages your DNS records
      domains              [name]      Manages your domain names
      logs                 [url]       Displays the logs for a deployment
      projects                         Manages your Projects
      rm | remove          [id]        Removes a deployment
      secrets              [name]      Manages your global Secrets, for use in Environment Variables
      teams                            Manages your teams
      whoami                           Shows the username of the currently logged in user

  ${chalk.dim('Global Options:')}

    -h, --help                     Output usage information
    -v, --version                  Output the version number
    --cwd                          Current working directory
    -A ${chalk.bold.underline('FILE')}, --local-config=${chalk.bold.underline(
  'FILE'
)}   Path to the local ${'`vercel.json`'} file
    -Q ${chalk.bold.underline('DIR')}, --global-config=${chalk.bold.underline(
  'DIR'
)}    Path to the global ${'`.vercel`'} directory
    -d, --debug                    Debug mode [off]
    --no-color                     No color mode [off]
    -S, --scope                    Set a custom scope
    -t ${chalk.underline('TOKEN')}, --token=${chalk.underline(
  'TOKEN'
)}        Login token

  ${chalk.dim('Examples:')}

  ${chalk.gray('–')} Deploy the current directory

    ${chalk.cyan(`$ ${getPkgName()}`)}

  ${chalk.gray('–')} Deploy a custom path

    ${chalk.cyan(`$ ${getPkgName()} /usr/src/project`)}

  ${chalk.gray('–')} Deploy with Environment Variables

    ${chalk.cyan(`$ ${getPkgName()} -e NODE_ENV=production`)}

  ${chalk.gray('–')} Show the usage information for the sub command ${chalk.dim(
  '`list`'
)}

    ${chalk.cyan(`$ ${getPkgName()} help list`)}
`;
