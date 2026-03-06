terraform {
    backend "s3" {
    bucket = "mybucket-for-state-forterraform"
    key    = "dev/terraform.tfstate"
    region = "eu-central-1"
    encrypt = true
    use_lockfile = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "Sujals_First_Bucket" {
  bucket = "its_new_bucket_created_by_github"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
