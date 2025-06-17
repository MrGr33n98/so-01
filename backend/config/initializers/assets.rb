# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')

# Enable caching for better performance
Rails.application.config.action_controller.perform_caching = true
Rails.application.config.cache_store = :memory_store