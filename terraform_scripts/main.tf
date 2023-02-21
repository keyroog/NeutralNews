terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}


resource "azurerm_resource_group" "rg" {
  name     = "NeutralNews"
  location = "westeurope"
}

resource "azurerm_storage_account" "cloudprojectstorage" {
  name                     = "neutralnewsstorage"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_table" "cloudprojecttablestorage" {
  name                 = "users"
  storage_account_name = azurerm_storage_account.cloudprojectstorage.name
}

resource "azurerm_service_plan" "cloudprojectappplan" {
  name                = "neutralnewsappplan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type = "Windows"
  sku_name = "Y1"
}

resource "azurerm_windows_function_app" "cloudprojectfunctionampp" {
  name                       = "neutralnewsfunctionapp"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  service_plan_id    = azurerm_service_plan.cloudprojectappplan.id
  storage_account_name       = azurerm_storage_account.cloudprojectstorage.name
  storage_account_access_key = azurerm_storage_account.cloudprojectstorage.primary_access_key
  site_config {
    application_stack {
      node_version="~16"
    }
  }
}

resource "azurerm_cognitive_account" "cognitiveservice" {
  name                = "neutralnewscognitiveservice"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "TextAnalytics"

  sku_name = "F0"
}