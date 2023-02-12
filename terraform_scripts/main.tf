resource "random_pet" "rg_name" {
  prefix = var.resource_group_name_prefix
}

resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = random_pet.rg_name.id
}

resource "azurerm_storage_account" "cloudprojectstorage" {
  name                     = "cpstorageresource"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_table" "cloudprojecttablestorage" {
  name                 = "users"
  storage_account_name = azurerm_storage_account.cloudprojectstorage.name
}

/*resource "azurerm_cognitive_account" "cloudprojectbingsearch" {
  name                = "cpbingresource"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Bing.Search"

  sku_name = "F0"
}

resource "azurerm_cognitive_account" "cloudprojectsentiment" {
  name                = "cpsentimentresource"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "CognitiveServices"

  sku_name = "F0"
}*/


resource "azurerm_service_plan" "cloudprojectappplan" {
  name                = "cpappresource"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type = "Windows"
  sku_name = "Y1"
}

resource "azurerm_windows_function_app" "cloudprojectfunctionampp" {
  name                       = "cpfunctionresource"
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