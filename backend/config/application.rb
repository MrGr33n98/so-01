require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MeuPainelAdmin
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Removendo configuração de assets para Rails 8.0
    # config.assets.paths << Rails.root.join('app', 'assets', 'stylesheets')
    # config.assets.paths << Rails.root.join('app', 'assets', 'javascripts')
    # config.assets.paths << Gem.loaded_specs['activeadmin'].full_gem_path + '/app/assets/stylesheets'
    # config.assets.paths << Gem.loaded_specs['activeadmin'].full_gem_path + '/app/assets/javascripts'

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end