# Azure Function ReadMe

This is a sample Azure Function which is used by the FAQ Bot. This is a simple function which can be used as a starting point for the development of a function.

## Adding a environment variable

When you develop application, you may be adding values to `.env` file. This file is not checked in to source control. Plus these values will not be added to the `App Settings` by default. For it to be added, you may have to update the file [`templates\azure\provision\azureFunctionApi.bicep`](../templates/azure/provision/azureFunctionApi.bicep)

For e.g., you have added a variable called `MY_CUSTOM_VARIABLE` in the .env file. You will have to add the following line in the `azureFunctionApi.bicep` file (Append it to the `appSettings` array)):

```bicep
  {
    name: 'MY_CUSTOM_VARIABLE'
    value: 'VALUE' // Values for the Custom Variable
  }
```bicep
